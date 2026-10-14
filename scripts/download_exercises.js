#!/usr/bin/env node
/**
 * FORTIS FIT - Exercise GIF Downloader
 * 
 * Usage:
 *   1. With RapidAPI ExerciseDB Key:
 *      node scripts/download_exercises.js --api-key=YOUR_RAPIDAPI_KEY
 *      (or add EXERCISE_DB_API_KEY=your_key in .env)
 * 
 *   2. Or download sample open-source fitness GIFs directly:
 *      node scripts/download_exercises.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Load environment variables if available
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      process.env[key] = value.trim();
    }
  });
}

// Target folder for GIFs
const OUTPUT_DIR = path.resolve(process.cwd(), 'public/assets/exercises');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 34 FORTIS exercises with ExerciseDB search terms
const FORTIS_EXERCISES = [
  { id: 'goblet_squat', query: 'dumbbell goblet squat', fallback: 'squat' },
  { id: 'bulgarian_split_squat', query: 'dumbbell single leg split squat', fallback: 'split squat' },
  { id: 'floor_press', query: 'dumbbell floor press', fallback: 'chest press' },
  { id: 'bent_over_row', query: 'dumbbell bent over row', fallback: 'row' },
  { id: 'romanian_deadlift', query: 'dumbbell romanian deadlift', fallback: 'deadlift' },
  { id: 'lateral_raise', query: 'dumbbell lateral raise', fallback: 'lateral raise' },
  { id: 'hammer_curls', query: 'dumbbell hammer curl', fallback: 'bicep curl' },
  { id: 'arnold_press', query: 'dumbbell arnold press', fallback: 'shoulder press' },
  { id: 'close_grip_press', query: 'dumbbell close grip press', fallback: 'floor press' },
  { id: 'gorilla_rows', query: 'dumbbell alternate row', fallback: 'bent over row' },
  { id: 'renegade_rows', query: 'dumbbell renegade row', fallback: 'row' },
  { id: 'upright_row', query: 'dumbbell upright row', fallback: 'upright row' },
  { id: 'single_leg_rdl', query: 'dumbbell single leg deadlift', fallback: 'romanian deadlift' },
  { id: 'glute_bridge', query: 'glute bridge', fallback: 'bridge' },
  { id: 'rear_delt_fly', query: 'dumbbell rear delt fly', fallback: 'reverse fly' },
  { id: 'jump_squats', query: 'jump squat', fallback: 'bodyweight squat' },
  { id: 'skipping', query: 'jump rope', fallback: 'skipping' },
  { id: 'dead_bugs', query: 'dead bug', fallback: 'core' },
  { id: 'reverse_crunches', query: 'reverse crunch', fallback: 'crunch' },
  { id: 'side_plank', query: 'side plank', fallback: 'plank' },
  { id: 'pallof_press', query: 'pallof press', fallback: 'anti-rotation' },
  { id: 'plank_to_pushup', query: 'plank to push up', fallback: 'push up' },
  { id: 'lying_leg_raises', query: 'lying leg raise', fallback: 'leg raise' },
  { id: 'suitcase_hold', query: 'suitcase carry', fallback: 'farmers walk' },
  { id: 'bird_dogs', query: 'bird dog', fallback: 'quadruped' },
  { id: 'mike_tyson_pushups', query: 'push up', fallback: 'push up' },
  { id: 'hip_switches_9090', query: 'hip mobility', fallback: 'seated stretch' },
  { id: 'worlds_greatest_stretch', query: 'lunge stretch', fallback: 'groin stretch' },
  { id: 'leg_swings', query: 'leg swing', fallback: 'dynamic stretch' },
  { id: 'deep_squat_hold', query: 'deep squat', fallback: 'squat' },
  { id: 'diaphragmatic_breathing', query: 'breathing', fallback: 'pelvic' },
  { id: 'slow_kegels', query: 'kegel', fallback: 'pelvic bridge' },
  { id: 'quick_flicks', query: 'pelvic', fallback: 'glute bridge' },
  { id: 'deep_squat_breathing', query: 'deep squat', fallback: 'squat' }
];

// Parse command line arguments
const args = process.argv.slice(2);
let rapidApiKey = process.env.EXERCISE_DB_API_KEY || '';
args.forEach(arg => {
  if (arg.startsWith('--api-key=')) {
    rapidApiKey = arg.split('=')[1].trim();
  }
});

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(destPath);
    
    protocol.get(url, response => {
      // Handle redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
      }

      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(destPath, () => {});
        return reject(new Error(`HTTP ${response.statusCode} - ${response.statusMessage}`));
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', err => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

function fetchJson(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.get(url, { headers }, res => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });
    req.on('error', reject);
  });
}

async function runExerciseDBDownload(apiKey) {
  console.log(`\n========================================`);
  console.log(`⚡ FORTIS - Downloading from ExerciseDB API`);
  console.log(`========================================\n`);

  console.log(`Fetching master exercise index from ExerciseDB (limit: 1300)...`);
  const headers = {
    'X-RapidAPI-Key': apiKey,
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  };

  const res = await fetchJson('https://exercisedb.p.rapidapi.com/exercises?limit=1300', headers);
  if (res.status !== 200 || !Array.isArray(res.data)) {
    console.error(`❌ Failed to fetch from ExerciseDB: HTTP ${res.status}`);
    console.error(res.data || res.raw);
    return;
  }

  const allExercises = res.data;
  console.log(`✅ Loaded ${allExercises.length} exercises from ExerciseDB catalog.\n`);

  let successCount = 0;
  for (const item of FORTIS_EXERCISES) {
    const dest = path.join(OUTPUT_DIR, `${item.id}.gif`);
    if (fs.existsSync(dest)) {
      console.log(`⏭️  Already downloaded: ${item.id}.gif`);
      successCount++;
      continue;
    }

    // Match by search query
    const match = allExercises.find(ex => 
      ex.name.toLowerCase().includes(item.query.toLowerCase())
    ) || allExercises.find(ex => 
      ex.name.toLowerCase().includes(item.fallback.toLowerCase())
    );

    if (match && match.gifUrl) {
      try {
        console.log(`⬇️  Downloading [${item.id}.gif] from ExerciseDB ("${match.name}")...`);
        await downloadFile(match.gifUrl, dest);
        console.log(`   ✅ Saved to ${dest}`);
        successCount++;
      } catch (e) {
        console.error(`   ❌ Failed to download ${item.id}:`, e.message);
      }
    } else {
      console.log(`⚠️  No direct match found in ExerciseDB for "${item.query}".`);
    }
  }

  console.log(`\n🎉 Process finished! ${successCount}/${FORTIS_EXERCISES.length} GIFs ready in public/assets/exercises/`);
}

async function runGuide() {
  console.log(`\n======================================================`);
  console.log(`🏋️  FORTIS FIT - Exercise GIF Downloader & Setup Guide`);
  console.log(`======================================================\n`);

  if (rapidApiKey) {
    await runExerciseDBDownload(rapidApiKey);
    return;
  }

  console.log(`You can acquire animated exercise GIFs using either of these methods:\n`);

  console.log(`METHOD 1: Using RapidAPI ExerciseDB (Free & Automated)`);
  console.log(`-----------------------------------------------------`);
  console.log(`1. Visit https://rapidapi.com/justin-WFActivity/api/exercisedb`);
  console.log(`2. Sign in and subscribe to the free plan (500 requests/mo).`);
  console.log(`3. Copy your X-RapidAPI-Key and run:`);
  console.log(`   node scripts/download_exercises.js --api-key=YOUR_API_KEY\n`);
  console.log(`   (Or add EXERCISE_DB_API_KEY=YOUR_API_KEY to your .env file)\n`);

  console.log(`METHOD 2: Official GymVisual 3D Asset Bundles`);
  console.log(`--------------------------------------------`);
  console.log(`1. Visit https://gymvisual.com for exact matching 3D anatomical animations.`);
  console.log(`2. Download the GIF or MP4 bundle for your exercises.`);
  console.log(`3. Place the files into: public/assets/exercises/<exercise_id>.gif\n`);

  console.log(`METHOD 3: Open-Source GitHub Datasets`);
  console.log(`-------------------------------------`);
  console.log(`You can download free datasets directly from GitHub:`);
  console.log(`• https://github.com/yuhonas/free-exercise-db (800+ exercises)`);
  console.log(`• https://github.com/hasaneyldrm/exercises-dataset (1,300+ exercises)\n`);

  console.log(`📁 Target folder for Fortis Fit:`);
  console.log(`   ${OUTPUT_DIR}\n`);
  console.log(`💡 Note: The Fortis WebApp is already configured to automatically detect`);
  console.log(`   any .gif in this directory and display it with automatic 3D vector fallback!`);
}

runGuide().catch(console.error);

