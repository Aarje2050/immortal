# Real Data Requirements for ImmortalSEO.com

> **This file tracks all placeholder/missing data that needs real information before deployment.**
> Mark items as DONE when you provide the real data.

---

## 1. Company Information

| Item | Current Value | Action Needed | Status |
|------|--------------|---------------|--------|
| Founded Year | `site.config.js` says `2023`, homepage says `Since 2008` | Decide the real founding year and update `config/site.config.js` line 29 | TODO |
| Geo Coordinates | Toronto coords (43.6452, -79.3806) in `config/seo.config.js` line 101-102 | Replace with real business address coordinates (Chittorgarh: 24.8887, 74.6269) | DONE (auto-fixed) |
| OG Image | Referenced as `/images/og-image.jpg` in `config/site.config.js` line 10 | Create a 1200x630px branded OG image and save to `public/images/og-image.jpg` | TODO |
| Office Photo | Referenced as `/images/office.jpg` in `config/seo.config.js` line 86 | Add a real office photo to `public/images/office.jpg` | TODO |
| Logo Image | Referenced as `/images/logo.png` in `config/seo.config.js` line 64 | Confirm `public/images/logo.png` exists (you have `public/immortal-logo.svg`) | TODO |

---

## 2. Social Media Profiles to Create

| Platform | URL Format | Where Used | Status |
|----------|-----------|------------|--------|
| LinkedIn | `https://linkedin.com/company/immortalseo` | `config/site.config.js`, schema, footer | EXISTS |
| X (Twitter) | `https://x.com/immortalseo` | `config/site.config.js`, `config/seo.config.js`, schema | TODO - Create account |
| Facebook | `https://facebook.com/immortalseo` | `config/site.config.js`, schema | TODO - Create page |
| Instagram | `https://instagram.com/immortalseo` | `config/site.config.js`, schema | TODO - Create account (lower priority) |
| YouTube | `https://youtube.com/@immortalseo` | schema sameAs | TODO - Create channel (medium priority) |

**After creating profiles, update the URLs in `config/site.config.js` lines 12-15.**

---

## 3. Google Business Profile

| Item | Details | Status |
|------|---------|--------|
| Create GBP | Create at https://business.google.com for your primary business address | TODO |
| Verify GBP | Complete Google's verification process | TODO |
| Add GBP URL to schema | Once verified, add the GBP URL to sameAs in schema | TODO |

**Recommendation:** Use your real Chittorgarh address since that's where you operate from. In the GBP description, mention you serve clients in USA and Canada remotely.

---

## 4. Homepage Placeholders

| Item | Location | Current State | Action |
|------|----------|---------------|--------|
| Client logos | `src/app/homepage/page.tsx` lines 240-245 | Placeholder gray boxes | Replace with real client logo images (need 4+ logos with client permission) |
| "250+ Businesses" stat | `src/app/homepage/page.tsx` line 430 | Claims 250+ businesses ranked | Verify this is accurate |
| "94% Client retention" stat | `src/app/homepage/page.tsx` line 407 | Claims 94% retention | Verify this is accurate |
| "187% avg traffic increase" | `src/app/homepage/page.tsx` line 417 | Claims 187% average increase | Verify this is accurate |
| "15+ years experience" | `src/app/homepage/page.tsx` line 425 | Claims 15+ years | Must match founded year |

---

## 5. Team & E-E-A-T Data

| Item | Details | Status |
|------|---------|--------|
| Rajesh Jat LinkedIn | Currently `https://linkedin.com/in/rajesh-jat` | Verify URL is correct |
| Manish Lamrod LinkedIn | Currently `https://linkedin.com/in/manish-lamrod` | Verify URL is correct |
| Team certifications | Google Analytics, Search Console, HubSpot, etc. | List real certifications for about page |
| Speaking engagements | Conferences, webinars, podcasts | List real appearances for E-E-A-T |
| Published work | Guest posts, articles, interviews | List for author bio enhancement |

---

## 6. Case Studies

| Case Study | Client Permission | Status |
|-----------|-------------------|--------|
| OMGS.in | Need written permission for public use | TODO |
| ZenCoder.ai | Need written permission | TODO |
| MillionCases.com | Need written permission | TODO |
| CBD Brand (Confidential) | Already anonymous | OK |
| ChittorPolyFab.com | Need written permission | TODO |

---

## 7. Client Testimonials

For the `/testimonials` page and homepage, you need real client quotes with:
- Full quote text
- Client name (or initials with permission)
- Job title
- Company name
- Permission to publish

**Current testimonials in location data (e.g., "Michael T. from Toronto Tech Solutions") appear to be placeholder/fictional. Replace with real testimonials or remove.**

---

## 8. USA City Pages - Content Research Needed

For each of the 10 USA cities, you'll need city-specific knowledge. The JSON data files include unique content sections. Review and customize:

| City | Data File | Needs Review |
|------|-----------|-------------|
| New York | `src/data/locations/usa/new-york.json` | All content sections |
| Los Angeles | `src/data/locations/usa/los-angeles.json` | All content sections |
| Chicago | `src/data/locations/usa/chicago.json` | All content sections |
| Houston | `src/data/locations/usa/houston.json` | All content sections |
| Phoenix | `src/data/locations/usa/phoenix.json` | All content sections |
| Dallas | `src/data/locations/usa/dallas.json` | All content sections |
| San Francisco | `src/data/locations/usa/san-francisco.json` | All content sections |
| Seattle | `src/data/locations/usa/seattle.json` | All content sections |
| Miami | `src/data/locations/usa/miami.json` | All content sections |
| Boston | `src/data/locations/usa/boston.json` | All content sections |

---

## 9. Analytics & Tracking

| Item | Status |
|------|--------|
| Google Analytics 4 (GA4) setup | TODO - Verify or create |
| Google Search Console verified | TODO - Verify |
| Google Tag Manager (optional) | TODO |

---

## Quick Action Summary

**Do these FIRST (blocks other work):**
1. Decide real founded year (2008 or 2023?)
2. Create X (Twitter) account for @immortalseo
3. Create Facebook Business page
4. Create Google Business Profile
5. Create OG image (1200x630px)

**Do these SOON (improves credibility):**
6. Get real client logos with permission
7. Collect real client testimonials
8. Verify all stats on homepage are accurate
9. Confirm team LinkedIn URLs work

**Do these LATER (enhancement):**
10. Create YouTube channel
11. Create Instagram account
12. List certifications and speaking engagements
