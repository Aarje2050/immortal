import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_CRAWL_LIMIT = 2 * 1024 * 1024; // 2 MB in bytes
const FETCH_TIMEOUT = 15000; // 15 seconds
const MAX_DOWNLOAD = 5 * 1024 * 1024; // 5 MB max download

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Please provide a valid URL' }, { status: 400 });
    }

    // Validate URL format
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    // Only allow http/https
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return NextResponse.json({ error: 'Only HTTP and HTTPS URLs are supported' }, { status: 400 });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

    const startTime = Date.now();

    try {
      const response = await fetch(parsedUrl.toString(), {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; ImmortalSEO-PageSizeChecker/1.0)',
          'Accept': 'text/html,application/xhtml+xml',
          'Accept-Encoding': 'identity', // Request uncompressed to measure raw size
        },
        signal: controller.signal,
        redirect: 'follow',
      });

      clearTimeout(timeout);
      const loadTime = Date.now() - startTime;

      if (!response.ok) {
        return NextResponse.json({
          error: `Server returned ${response.status} ${response.statusText}`,
        }, { status: 200 }); // Return 200 so frontend can display the error
      }

      const contentType = response.headers.get('content-type') || 'unknown';

      // Read the body as text
      const reader = response.body?.getReader();
      if (!reader) {
        return NextResponse.json({ error: 'Could not read response body' }, { status: 200 });
      }

      let totalBytes = 0;
      const chunks: Uint8Array[] = [];
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          totalBytes += value.length;
          chunks.push(value);
          if (totalBytes > MAX_DOWNLOAD) {
            reader.cancel();
            break;
          }
        }
      }

      // Decode to text to measure character count
      const decoder = new TextDecoder('utf-8', { fatal: false });
      const htmlText = decoder.decode(
        new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0)).buffer.byteLength > 0
          ? mergeArrays(chunks)
          : new Uint8Array(0)
      );

      const htmlSizeBytes = totalBytes;
      const htmlSizeKB = (htmlSizeBytes / 1024).toFixed(1);
      const characterCount = htmlText.length;

      // Estimate gzipped size (rough approximation: ~30% of raw for HTML)
      const estimatedGzipBytes = Math.round(htmlSizeBytes * 0.30);
      const estimatedGzipKB = (estimatedGzipBytes / 1024).toFixed(1);

      // Check against 2MB limit
      const isUnderLimit = htmlSizeBytes < GOOGLE_CRAWL_LIMIT;
      const percentOfLimit = ((htmlSizeBytes / GOOGLE_CRAWL_LIMIT) * 100).toFixed(2);

      // Percentile estimation based on HTTPArchive data
      let percentile: string;
      if (htmlSizeBytes <= 10 * 1024) percentile = 'Below 25th percentile (lighter than 75% of websites)';
      else if (htmlSizeBytes <= 33 * 1024) percentile = 'Around 50th percentile (median website size)';
      else if (htmlSizeBytes <= 80 * 1024) percentile = 'Between 50th-75th percentile';
      else if (htmlSizeBytes <= 155 * 1024) percentile = 'Around 90th percentile (heavier than most)';
      else if (htmlSizeBytes <= 500 * 1024) percentile = 'Above 90th percentile (consider optimization)';
      else if (htmlSizeBytes < GOOGLE_CRAWL_LIMIT) percentile = 'Above 95th percentile (unusually large)';
      else percentile = 'Above 99th percentile — exceeds Google\'s 2MB crawl limit!';

      // Count DOM indicators
      const scriptTags = (htmlText.match(/<script[\s>]/gi) || []).length;
      const styleTags = (htmlText.match(/<style[\s>]/gi) || []).length;
      const inlineStyles = (htmlText.match(/style="/gi) || []).length;
      const divCount = (htmlText.match(/<div[\s>]/gi) || []).length;

      return NextResponse.json({
        success: true,
        url: parsedUrl.toString(),
        htmlSizeBytes,
        htmlSizeKB,
        estimatedGzipKB,
        characterCount,
        isUnderLimit,
        percentOfLimit,
        percentile,
        loadTime,
        statusCode: response.status,
        contentType,
        domIndicators: {
          scriptTags,
          styleTags,
          inlineStyles,
          divCount,
        },
        googleCrawlLimitBytes: GOOGLE_CRAWL_LIMIT,
      });
    } catch (fetchError) {
      clearTimeout(timeout);
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        return NextResponse.json({ error: 'Request timed out (15 second limit). The page may be too slow to respond.' }, { status: 200 });
      }
      return NextResponse.json({ error: `Failed to fetch the URL: ${fetchError instanceof Error ? fetchError.message : 'Unknown error'}` }, { status: 200 });
    }
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

function mergeArrays(arrays: Uint8Array[]): Uint8Array {
  const total = arrays.reduce((acc, arr) => acc + arr.length, 0);
  const merged = new Uint8Array(total);
  let offset = 0;
  for (const arr of arrays) {
    merged.set(arr, offset);
    offset += arr.length;
  }
  return merged;
}
