# Gemini API Troubleshooting Guide

## Common Issues and Solutions

### Issue 1: "Failed to generate content from Gemini API"

**Possible Causes:**
1. Invalid API key
2. API key not enabled for Gemini API
3. Quota exceeded
4. Network issues
5. Server not restarted after adding API key

---

## ✅ Solution Steps

### Step 1: Verify API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Check if your API key is valid: `AIzaSyD8ufFqbUVMQ8-f4A9L8W1zaVTobGUcE7c`
3. If expired or invalid, create a new one

### Step 2: Enable Gemini API

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to "APIs & Services" > "Library"
4. Search for "Generative Language API"
5. Click "Enable"

### Step 3: Check API Key Restrictions

1. In Google AI Studio, click on your API key
2. Check "API restrictions"
3. Make sure "Generative Language API" is allowed
4. Remove any IP restrictions for testing

### Step 4: Verify Environment Variable

Check your `.env.local` file:
```env
GEMINI_API_KEY=AIzaSyD8ufFqbUVMQ8-f4A9L8W1zaVTobGUcE7c
```

**Important:** No quotes, no spaces, just the key!

### Step 5: Restart Development Server

**CRITICAL:** You MUST restart the server after changing `.env.local`

```bash
# Stop the server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

### Step 6: Test API Key Directly

Create a test file to verify the API key works:

```typescript
// test-gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = 'AIzaSyD8ufFqbUVMQ8-f4A9L8W1zaVTobGUcE7c'
const genAI = new GoogleGenerativeAI(apiKey)
const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

async function test() {
  try {
    const result = await model.generateContent('Say hello')
    const response = await result.response
    console.log('✅ Success:', response.text())
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

test()
```

Run: `npx tsx test-gemini.ts`

---

## 🔍 Debugging Checklist

- [ ] API key is correct in `.env.local`
- [ ] No extra spaces or quotes around API key
- [ ] Server restarted after changing `.env.local`
- [ ] Generative Language API is enabled in Google Cloud
- [ ] API key has no restrictions blocking the API
- [ ] Not exceeding free tier quota (60 requests/min)
- [ ] Internet connection is working
- [ ] No firewall blocking Google APIs

---

## 📊 Check Quota Usage

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services" > "Dashboard"
3. Click on "Generative Language API"
4. Check "Quotas" tab
5. Verify you haven't exceeded limits

**Free Tier Limits:**
- 60 requests per minute
- 1,500 requests per day

---

## 🆕 Get a New API Key

If your current key isn't working:

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Select "Create API key in new project" or use existing
4. Copy the new key
5. Update `.env.local`
6. Restart server

---

## 🧪 Quick Test

Try this in your browser console (after signing in):

```javascript
fetch('/api/query-bot', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: 'Hello' })
})
.then(r => r.json())
.then(console.log)
.catch(console.error)
```

---

## 🔧 Alternative: Use Different Model

If `gemini-pro` isn't working, try `gemini-1.5-flash`:

Update `lib/gemini.ts`:
```typescript
export const geminiModel = genAI.getGenerativeModel({ 
  model: 'gemini-1.5-flash' 
})
```

---

## 📞 Still Not Working?

1. Check server logs in terminal for detailed errors
2. Look for specific error messages
3. Check browser console for network errors
4. Verify API key in Google AI Studio is "Active"
5. Try creating a completely new API key

---

## ✅ Expected Behavior

When working correctly, you should see in terminal:
```
✅ Gemini API Key loaded: AIzaSyD8uf...
🤖 Calling Gemini API...
✅ Gemini API response received
```

When there's an error:
```
❌ Gemini API Error: [detailed error message]
```

---

## 🚨 Common Error Messages

### "API_KEY_INVALID"
**Solution:** Get a new API key from Google AI Studio

### "QUOTA_EXCEEDED"
**Solution:** Wait for quota reset or upgrade plan

### "RATE_LIMIT_EXCEEDED"
**Solution:** Wait 1 minute and try again

### "PERMISSION_DENIED"
**Solution:** Enable Generative Language API in Google Cloud Console

---

## 💡 Pro Tips

1. **Always restart server** after changing `.env.local`
2. **Check terminal logs** for detailed error messages
3. **Test with simple queries** first (e.g., "Hello")
4. **Monitor quota usage** in Google Cloud Console
5. **Keep API key secure** - never commit to Git

---

## 📝 Need Help?

If still having issues, provide:
1. Exact error message from terminal
2. Browser console errors
3. API key status from Google AI Studio
4. Whether server was restarted
5. Output of test script
