# SocialHub - Development Platforms CA

A social media platform where users can register, log in, browse a news feed, and post updates. Built as part of the "Development Platforms" course assignment. 

## Links
**Live Demo:** https://development-platforms.netlify.app/index.html

**Repository:** https://github.com/tedy-abr/development-platforms-ca

## Getting Started

Follow these instructions to run the project locally.

### Prerequisites
* Node.js 
* npm

### Installation

**Clone the repository:**

git clone [https://github.com/tedy-abr/development-platforms-ca.git](https://github.com/tedy-abr/development-platforms-ca.git)
   
   cd development-platforms-ca

**Install dependencies:**

npm install

**Configure Environment Variables:**

Create a `.env` file in the root directory and add your Supabase keys:

VITE_SUPABASE_URL=[https://INSERT-YOUR-URL-HERE.supabase.co](https://INSERT-YOUR-URL-HERE.supabase.co)
   
VITE_SUPABASE_KEY=INSERT-YOUR-ANON-KEY-HERE

**Run the development server:**

npm run build

**Run the development server:**

npm run build


## Motivation

I chose to implement Option 2, Frontend with Supabase for this assignment.
After working with Express and Node.js in Module 1 I was interested in exploring the Backend as a Service approach introduced in Module 3. My goal was to experience how Supabase could simplify the backend infrastructure allowing me to focus more on the user interface and frontend logic.

Additionally I used my previous JavaScript 2 course assignment as inspiration for this project. Since I already had a good understanding of how to structure a multi page application with Vite, adapting that architecture allowed me to focus my learning efforts on Supabase's authentication and database features, rather than reinventing the wheel on the frontend.


**What I liked**

It was impressive how quickly I could set up a fully working authentication system, Login and Register using the Supabase client library, compared to manually handling JWTs and password hashing in Express as we learned in Module 1. Learning to secure data using Row Level Security policies directly in the database was also a new and interesting paradigm. It felt powerful to define who can see what right next to the data itself.

**What I found difficult**

The development process went quite smoothly. The only minor challenge was getting used to the specific syntax for Supabase database queries compared to standard SQL or the methods we used in previous modules.


**SaaS vs. Custom API**

While Supabase (SaaS) is incredibly fast and convenient for getting a project up and running, I can see why a Custom API Option 1 is sometimes better. With a custom API I have total control over the server logic and data processing, whereas with Supabase I am limited to the tools and structure they provide. However, I can't fully judge this limitation yet, as I haven't explored the full potential of Supabase and what it offers.

Overall though, Backend as a Service is my new favorite tool that I plan to keep using and mastering.
