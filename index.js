import express, { json } from "express";
import cors from "cors";
import bodyParser from "body-parser" ;
import pool from "./db.js";


const app=express();
// import pool from "../Backend/db";
const PORT=5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());



const skillKeywords = [
    // Programming Languages
    "java", "javascript", "typescript", "python", "c", "c++", "c#", "kotlin", "go", "ruby", "swift", "rust", "php", "perl", "dart", "scala",
  
    // Web & Frontend
    "html", "css", "sass", "less", "react", "angular", "vue", "next.js", "nuxt.js", "svelte", "bootstrap", "tailwind", "jquery", "vite", "webpack", "babel", "material-ui", "chakra ui",
  
    // Backend Frameworks
    "node", "express", "spring", "spring boot", "flask", "django", "laravel", "rails", "nestjs", "fastapi", "adonis", "asp.net", "struts", "koa",
  
    // Databases
    "sql", "mysql", "postgresql", "sqlite", "mongodb", "redis", "firebase", "oracle", "mariadb", "cassandra", "elasticsearch", "dynamodb",
  
    // DevOps & Cloud
    "git", "github", "bitbucket", "gitlab", "docker", "kubernetes", "jenkins", "ci/cd", "aws", "azure", "gcp", "heroku", "netlify", "vercel", "render", "nginx", "apache",
  
    // Mobile & Cross-Platform
    "android", "ios", "flutter", "react native", "xamarin", "cordova", "ionic", "kotlin", "swift",
  
    // Testing Tools
    "jest", "mocha", "chai", "cypress", "selenium", "junit", "pytest", "karma", "testing library",
  
    // APIs & Tools
    "rest", "rest api", "graphql", "postman", "swagger", "jwt", "axios", "socket.io",
  
    // CMS & E-Commerce
    "wordpress", "shopify", "magento", "woocommerce", "strapi", "sanity", "contentful",
  
    // Editors & Environments
    "vscode", "intellij", "eclipse", "android studio", "xcode", "netbeans", "sublime", "notepad++", "terminal", "command line", "linux",
  
    // Package Managers
    "npm", "yarn", "pip", "composer", "maven", "gradle",
  
    // Soft/Generic
    "skill", "skills", "proficient", "experienced", "knowledge", "familiar", "hands-on", "tool", "framework", "language", "technology", "technologies", "stack"
  ];
  
  // Categorization Logic
  function categorizeKeyPoints(keyPoints) {
    const categories = {
      Experience: [],
      Education: [],
      Skills: [],
      Projects: [],
    };
  
    keyPoints.forEach(point => {
      const lower = point.toLowerCase();
  
      if (
        lower.includes("worked") ||
        lower.includes("intern") ||
        lower.includes("company") ||
        lower.includes("experience") ||
        lower.includes("organization") ||
        lower.includes("employed") ||
        lower.includes("role at") ||
        lower.includes("Years")
      ) {
        categories.Experience.push(point);
      } else if (
        lower.includes("b.e") ||
        lower.includes("degree") ||
        lower.includes("college") ||
        lower.includes("university") ||
        lower.includes("graduated") ||
        lower.includes("cgpa") ||
        lower.includes("school") ||
        lower.includes("education")||
        lower.includes("institute") 
      ) {
        categories.Education.push(point);
      } else if (
        lower.includes("project") ||
        lower.includes("developed") ||
        lower.includes("created") ||
        lower.includes("built") ||
        lower.includes("designed") ||
        lower.includes("implemented")
        
      ) {
        categories.Projects.push(point);
      } else if (skillKeywords.some(keyword => lower.includes(keyword))) {
        categories.Skills.push(point);
      } else {
        categories.Skills.push(point); 
      }
    });
  
    return categories;
  }
  
  // API Route
  app.post("/categorize", (req, res) => {
    const { keyPoints } = req.body;
  
    if (!Array.isArray(keyPoints)) {
      return res.status(400).json({ error: "keyPoints must be an array" });
    }
  
    const result = categorizeKeyPoints(keyPoints);
    res.json(result);
  });

  app.post("/save-resume", async (req, res) => {
    const { name, mobile, email, template, keyPoints } = req.body;
  
    if (!name || !mobile || !email || !template || !Array.isArray(keyPoints)) {
      return res.status(400).json({ error: "Invalid or missing data" });
    }
  
    try {
      const result = await pool.query(
        "INSERT INTO resumes (name, mobile, email, template, keypoints) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, mobile, email, template, keyPoints]
      );
  
      res.status(201).json({ message: "Resume saved", data: result.rows[0] });
    } catch (err) {
      console.error("❌ Database Error:", err); 
      res.status(500).json({ error: "Database error" });
    }
  });
  
  
  app.listen(PORT, () => {
    console.log(`✅ Resume Categorizer API running at: http://localhost:${PORT}`);
  });
