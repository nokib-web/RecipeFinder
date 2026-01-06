# 🚀 Deploying to Vercel

Follow these steps to deploy your Recipe Finder app to Vercel:

### 1. Push your code to GitHub
Make sure all your latest changes are pushed to your GitHub repository:
```bash
git add .
git commit -m "Finalizing app for deployment"
git push
```

### 2. Create a Vercel Project
1. Go to [Vercel](https://vercel.com) and log in.
2. Click **Add New** -> **Project**.
3. Import your `RecipeFinder` repository.

### 3. Configure Environment Variables
Before clicking "Deploy", scroll down to the **Environment Variables** section and add:

| Key | Value |
| :--- | :--- |
| `SPOONACULAR_API_KEY` | Your actual Spoonacular API Key |
| `NEXT_PUBLIC_SPOONACULAR_API_KEY` | (Optional) If you use it on client components |

> **Note**: For this project, we've set up the API calls to work with `SPOONACULAR_API_KEY` from the server side.

### 4. Deploy!
Click **Deploy**. Vercel will build and host your application. Once finished, you'll get a production URL.

---

### 🛠️ Post-Deployment Tips
- **Domain**: You can connect a custom domain in the project settings.
- **Analytics**: Vercel offers built-in analytics to track your users.
- **Quota Management**: Keep an eye on your Spoonacular console to see your daily API usage.
