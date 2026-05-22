# Deploy CoreLogic Web Lab to Netlify (GitHub)

## 1. Push to GitHub

Repository: **https://github.com/corelogicweblab-dev/corelogic-web**

```bash
git push origin main
```

## 2. Connect Netlify

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. **Add new site** → **Import an existing project** → **GitHub**
3. Select **corelogicweblab-dev/corelogic-web**
4. Build settings (from `netlify.toml` — verify in **Site configuration → Build**):
   - **Base directory:** *(leave empty — repo root)*
   - **Build command:** `npm run build`
   - **Publish directory:** `.next` *(or leave empty — must NOT be `.` / same as base)*
   - **Node version:** 20

   > **If deploy fails:** “publish directory cannot be the same as base directory” → set Publish directory to `.next` or clear it completely. Do **not** use `.` as publish directory.

5. Click **Deploy site**

## 3. Environment variables (Netlify UI)

**Site settings → Environment variables → Production:**

| Variable | Value |
|----------|--------|
| `NEXT_PUBLIC_SITE_URL` | `https://YOUR-SITE.netlify.app` (your live URL) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | `corelogicweblab@gmail.com` |
| `NEXT_PUBLIC_CONTACT_PHONE` | `0915 244 4480` |
| `NEXT_PUBLIC_CONTACT_PHONE_TEL` | `+639152444480` |

Optional (contact form email delivery):

| Variable | Value |
|----------|--------|
| `RESEND_API_KEY` | Your Resend API key |
| `RESEND_FROM` | Verified sender on Resend |

6. **Redeploy** after adding env vars (Deploys → Trigger deploy)

## 4. Custom domain (optional)

**Domain settings → Add custom domain** → follow DNS instructions.

Update `NEXT_PUBLIC_SITE_URL` to your custom domain and redeploy.

## 5. Verify production

- [ ] Logo loads (`/corelogic.png`)
- [ ] Contact form submits
- [ ] Live chat responds
- [ ] Email link: `corelogicweblab@gmail.com`
- [ ] Phone link: `0915 244 4480` / `tel:+639152444480`
- [ ] `https://YOUR-SITE.netlify.app/api/health` returns JSON

## Production contact

- **Email:** corelogicweblab@gmail.com
- **Phone:** 0915 244 4480
