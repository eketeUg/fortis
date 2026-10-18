import { DayPlan, Exercise } from './workout.types';

export const EXERCISE_DATABASE: Record<string, Exercise> = {
  "skipping": {
    "id": "skipping",
    "name": "Jump Rope / Skipping",
    "targetMuscles": [
      "Calves",
      "Cardio / Full Body",
      "Shoulders"
    ],
    "equipment": "Jump Rope",
    "cue": "Light on the balls of your feet, elbows pinned to your ribs, flick from the wrists.",
    "instructions": [
      "Maintain an upright athletic posture with shoulders relaxed down and back.",
      "Keep elbows close to your ribcage and rotate the rope strictly with your wrists.",
      "Bounce lightly on the balls of your feet, jumping only 1-2 inches off the ground.",
      "Breathe rhythmically in through the nose and out through the mouth to sustain high intensity."
    ],
    "mistakes": [
      "Swinging arms widely from shoulders instead of turning wrists.",
      "Jumping too high or kicking feet back.",
      "Landing heavily on flat feet or heels."
    ],
    "illustrationType": "skipping",
    "defaultRepsOrTime": "Intervals / High Cadence",
    "category": "cardio"
  },
  "hollow_body_hold": {
    "id": "hollow_body_hold",
    "name": "Hollow Body Hold",
    "targetMuscles": [
      "Core",
      "Obliques"
    ],
    "equipment": "Mat / Floor",
    "cue": "Crush your lower back hard into the floor — zero daylight under your spine.",
    "instructions": [
      "Lie flat on your back, arms extended overhead beside your ears and legs glued straight.",
      "Press your lower spine firmly down into the floor by contracting your abs and tilting pelvis.",
      "Simultaneously lift your shoulder blades and legs 4–6 inches off the floor.",
      "Hold this rigid banana shape, breathing shallowly into your upper chest while maintaining maximum abdominal compression."
    ],
    "mistakes": [
      "Allowing lower back to arch off the floor.",
      "Bending the knees or letting legs rise too high.",
      "Holding breath instead of bracing under control."
    ],
    "illustrationType": "dead_bugs",
    "defaultRepsOrTime": "3 × 35s hold",
    "category": "isometric"
  },
  "rkc_plank": {
    "id": "rkc_plank",
    "name": "RKC Maximum Tension Plank",
    "targetMuscles": [
      "Core",
      "Glutes",
      "Shoulders"
    ],
    "equipment": "Mat / Floor",
    "cue": "Clench fists, clamp glutes hard, and actively drag elbows towards your toes.",
    "instructions": [
      "Set up in a standard forearm plank with fists clenched tightly and elbows beneath shoulders.",
      "Squeeze your glutes, quadriceps, and abdominal wall as hard as possible.",
      "Without actually moving, aggressively pull your elbows down toward your toes and pull toes toward elbows.",
      "Create full-body total muscular irradiation — your entire body should tremble within 20 seconds."
    ],
    "mistakes": [
      "Passive sagging of the hips or piking hips into the air.",
      "Relaxing glute contraction.",
      "Treating it like a passive endurance hold instead of a maximum tension lock."
    ],
    "illustrationType": "side_plank",
    "defaultRepsOrTime": "3 × 30s max tension",
    "category": "isometric"
  },
  "side_plank": {
    "id": "side_plank",
    "name": "Extended Side Plank Hold",
    "targetMuscles": [
      "Obliques",
      "Core",
      "Glutes"
    ],
    "equipment": "Mat / Floor",
    "cue": "Drive hips high, stack your body in a razor-straight line from neck to ankles.",
    "instructions": [
      "Lie on your side with elbow directly beneath your shoulder and feet stacked.",
      "Lift hips off the floor until your body forms a straight diagonal line.",
      "Extend top arm straight toward the ceiling and squeeze the bottom oblique and glute.",
      "Keep your chest proud and neck neutral, avoiding any forward rotation of the torso."
    ],
    "mistakes": [
      "Dropping or sagging hips towards the floor.",
      "Rolling the top shoulder forward.",
      "Piking hips backward instead of squeezing glutes forward."
    ],
    "illustrationType": "side_plank",
    "defaultRepsOrTime": "3 × 35s/side",
    "category": "isometric"
  },
  "copenhagen_plank": {
    "id": "copenhagen_plank",
    "name": "Copenhagen Adductor Plank",
    "targetMuscles": [
      "Core",
      "Obliques",
      "Glutes"
    ],
    "equipment": "Chair / Bench",
    "cue": "Lock your top leg on the bench, drive bottom hip high, crush the groin muscles.",
    "instructions": [
      "Set up in a side plank with your top foot/ankle resting on a bench or sturdy chair.",
      "Place your bottom elbow directly under your shoulder on the floor.",
      "Elevate your hips and lift your bottom leg to hover beneath the bench.",
      "Maintain an unbroken straight line through your torso, resisting rotational collapse."
    ],
    "mistakes": [
      "Allowing hips to drop or bend at the waist.",
      "Placing too much pressure on the knee joint instead of engaging the inner thigh.",
      "Letting the torso twist toward the floor."
    ],
    "illustrationType": "side_plank",
    "defaultRepsOrTime": "3 × 20s/side",
    "category": "isometric"
  },
  "suitcase_hold": {
    "id": "suitcase_hold",
    "name": "Suitcase Isometric Hold",
    "targetMuscles": [
      "Obliques",
      "Core",
      "Forearms"
    ],
    "equipment": "Dumbbells",
    "cue": "Stand perfectly upright — resist leaning toward the weighted dumbbell.",
    "instructions": [
      "Deadlift a single heavy dumbbell with one hand and stand up tall.",
      "Lock your ribs down, pull shoulders back, and clench your opposite fist for balance.",
      "Resist the urge to tilt sideways; fight to maintain perfect vertical posture.",
      "Breathe calmly while your opposite obliques work overtime to keep you level."
    ],
    "mistakes": [
      "Leaning or bending torso away from the dumbbell.",
      "Shrugging the weighted shoulder into the ear.",
      "Twisting or rotating the hips."
    ],
    "illustrationType": "side_plank",
    "defaultRepsOrTime": "3 × 35s/side",
    "category": "isometric"
  },
  "wall_sit_hold": {
    "id": "wall_sit_hold",
    "name": "Wall Sit Isometric Quake",
    "targetMuscles": [
      "Quads",
      "Glutes",
      "Calves"
    ],
    "equipment": "Bodyweight",
    "cue": "Thighs parallel to the floor, drive heels into ground, press spine flat to wall.",
    "instructions": [
      "Lean your back flat against a sturdy wall and slide down until your knees form a 90-degree angle.",
      "Ensure your knees are directly above your ankles and thighs are completely parallel to the floor.",
      "Press your lower back firmly into the wall and rest hands across your chest (not on thighs).",
      "Hold the position and embrace the quad burn without shifting weight onto toes."
    ],
    "mistakes": [
      "Resting hands or forearms on knees to assist.",
      "Allowing hips to stay above 90 degrees.",
      "Letting knees cave inward."
    ],
    "illustrationType": "goblet_squat",
    "defaultRepsOrTime": "3 × 45s hold",
    "category": "isometric"
  },
  "dead_bugs": {
    "id": "dead_bugs",
    "name": "Dead Bug Isometric Pause",
    "targetMuscles": [
      "Core",
      "Obliques"
    ],
    "equipment": "Mat / Floor",
    "cue": "Lower back glued to the floor, freeze for 3 seconds at full extension.",
    "instructions": [
      "Lie flat on your back with arms extended toward the ceiling and knees bent at 90 degrees.",
      "Brace your core so your entire lumbar spine is sealed against the floor.",
      "Slowly extend opposite arm and leg until hovering 2 inches off the ground.",
      "Hold the extended position for a full 3-second isometric pause, then return under control."
    ],
    "mistakes": [
      "Allowing lower back to arch as limbs reach out.",
      "Rushing through the movement without pausing.",
      "Letting the resting knee drift toward the chest."
    ],
    "illustrationType": "dead_bugs",
    "defaultRepsOrTime": "3 × 10/side (3s pause)",
    "category": "isometric"
  },
  "bird_dogs": {
    "id": "bird_dogs",
    "name": "Bird Dog Static Lockout",
    "targetMuscles": [
      "Back",
      "Glutes",
      "Core"
    ],
    "equipment": "Mat / Floor",
    "cue": "Reach long like a spear, lock hips level, hold 3s at the peak.",
    "instructions": [
      "Start on all fours with hands under shoulders and knees under hips.",
      "Brace your abdomen to keep your spine flat like a tabletop.",
      "Simultaneously reach your right arm straight forward and left leg straight back.",
      "Squeeze the glute at the top and hold the static lockout for 3 seconds before alternating."
    ],
    "mistakes": [
      "Over-arching lower back or lifting leg too high.",
      "Tilting hips sideways.",
      "Looking up and hyperextending the neck."
    ],
    "illustrationType": "bird_dogs",
    "defaultRepsOrTime": "3 × 10/side (3s pause)",
    "category": "isometric"
  },
  "bear_crawl_hold": {
    "id": "bear_crawl_hold",
    "name": "Bear Crawl Hover Hold",
    "targetMuscles": [
      "Core",
      "Shoulders",
      "Quads"
    ],
    "equipment": "Mat / Floor",
    "cue": "Knees 1 inch off the floor, spine flat as a table, push ground away.",
    "instructions": [
      "Start on all fours with wrists directly under shoulders and knees under hips.",
      "Tuck toes and lift your knees just 1 to 2 inches off the floor.",
      "Grip the floor hard with your fingertips, push the earth away, and pull ribs to hips.",
      "Hold completely static without letting knees rise or back sway."
    ],
    "mistakes": [
      "Lifting knees too high off the floor.",
      "Sagging the lower back.",
      "Dropping head down between shoulders."
    ],
    "illustrationType": "dead_bugs",
    "defaultRepsOrTime": "3 × 40s hold",
    "category": "isometric"
  },
  "l_sit_tuck": {
    "id": "l_sit_tuck",
    "name": "Floor L-Sit / Tuck Hold",
    "targetMuscles": [
      "Core",
      "Triceps",
      "Shoulders"
    ],
    "equipment": "Mat / Floor",
    "cue": "Hands beside hips, press through palms to hover hips and knees off the ground.",
    "instructions": [
      "Sit on the floor with legs out and hands placed flat beside your mid-thighs.",
      "Depress shoulders hard, push the floor away, and lift your butt completely off the ground.",
      "Pull your knees up tight toward your chest in a compact tuck (or extend straight for full L-sit).",
      "Hold the hover, compressing your hip flexors and abs with maximum intensity."
    ],
    "mistakes": [
      "Allowing butt to stay resting on the floor.",
      "Shrugging shoulders up toward ears.",
      "Letting feet touch the ground during the hold."
    ],
    "illustrationType": "dead_bugs",
    "defaultRepsOrTime": "3 × 20s hold",
    "category": "isometric"
  },
  "prone_cobra_hold": {
    "id": "prone_cobra_hold",
    "name": "Prone Cobra / Superman Hold",
    "targetMuscles": [
      "Back",
      "Glutes",
      "Shoulders"
    ],
    "equipment": "Mat / Floor",
    "cue": "Rotate thumbs to ceiling, lift chest and thighs, clamp glutes hard.",
    "instructions": [
      "Lie face down on your stomach with arms by your sides and legs straight.",
      "Squeeze your shoulder blades together and externally rotate arms so thumbs point to the ceiling.",
      "Lift your chest and thighs off the floor by firing upper back and glutes.",
      "Hold the arched tension while breathing smoothly through your diaphragm."
    ],
    "mistakes": [
      "Cranking the neck upward instead of keeping chin tucked.",
      "Forgetting to squeeze the glutes.",
      "Holding breath."
    ],
    "illustrationType": "bird_dogs",
    "defaultRepsOrTime": "3 × 35s hold",
    "category": "isometric"
  },
  "glute_bridge_hold": {
    "id": "glute_bridge_hold",
    "name": "Glute Bridge Isometric Peak",
    "targetMuscles": [
      "Glutes",
      "Hamstrings",
      "Core"
    ],
    "equipment": "Mat / Floor",
    "cue": "Drive heels through the floor, full hip extension, clamp glutes like a vice.",
    "instructions": [
      "Lie on your back with knees bent and feet flat on the floor, hip-width apart.",
      "Drive through your heels to raise your hips until knees, hips, and shoulders form a straight line.",
      "At the very top, clamp your glutes with 100% force and brace your abs to prevent lumbar hyperextension.",
      "Hold the peak isometric contraction, feeling the burn directly in your glutes."
    ],
    "mistakes": [
      "Arching lower back instead of rotating pelvis and squeezing glutes.",
      "Letting knees collapse inward.",
      "Pushing through the toes instead of heels."
    ],
    "illustrationType": "glute_bridge",
    "defaultRepsOrTime": "3 × 45s hold",
    "category": "isometric"
  },
  "diaphragmatic_breathing": {
    "id": "diaphragmatic_breathing",
    "name": "Diaphragmatic Vacuum Breathing",
    "targetMuscles": [
      "Pelvic Floor",
      "Core"
    ],
    "equipment": "Bodyweight",
    "cue": "Exhale every drop of air, vacuum navel up and back against your spine.",
    "instructions": [
      "Sit or lie on your back with one hand on your lower belly and one on your chest.",
      "Inhale deeply through your nose, letting your belly expand 360 degrees and pelvic floor relax.",
      "Exhale forcefully through your mouth until your lungs are empty, then gently pull your navel up and in.",
      "Hold this stomach vacuum for 8–10 seconds, then inhale smoothly and repeat."
    ],
    "mistakes": [
      "Chest breathing instead of expanding the lower ribcage and belly.",
      "Tensing shoulders and neck.",
      "Rushing the exhale."
    ],
    "illustrationType": "dead_bugs",
    "defaultRepsOrTime": "1 min deep cycles",
    "category": "pelvic"
  },
  "slow_kegels": {
    "id": "slow_kegels",
    "name": "Slow Power Kegels",
    "targetMuscles": [
      "Pelvic Floor"
    ],
    "equipment": "Bodyweight",
    "cue": "Engage and lift the pelvic floor like an elevator rising, hold 5s, release fully.",
    "instructions": [
      "Identify the pelvic floor muscles (the muscles used to stop urination mid-stream).",
      "Contract and pull these muscles upward toward your navel with deliberate control.",
      "Maintain a powerful squeeze for 5 full seconds without holding your breath.",
      "Release slowly over 5 seconds, ensuring the muscles fully relax and drop before the next repetition."
    ],
    "mistakes": [
      "Tensing glutes, inner thighs, or abdomen instead of isolated pelvic floor.",
      "Holding breath during contraction.",
      "Failing to let the pelvic floor fully drop and relax between reps."
    ],
    "illustrationType": "glute_bridge",
    "defaultRepsOrTime": "10 reps (5s hold / 5s rest)",
    "category": "pelvic"
  },
  "quick_flicks": {
    "id": "quick_flicks",
    "name": "Fast-Twitch Kegel Flicks",
    "targetMuscles": [
      "Pelvic Floor"
    ],
    "equipment": "Bodyweight",
    "cue": "Fast snap contraction followed immediately by complete relaxation.",
    "instructions": [
      "Contract your pelvic floor muscles quickly and forcefully like flicking a switch.",
      "Hold for only 1 second, then release immediately with equal speed.",
      "Breathe naturally and maintain a steady cadence across all reps.",
      "This trains the fast-twitch muscle fibers critical for pelvic stability and core reactivity."
    ],
    "mistakes": [
      "Squeezing abdominal muscles instead of the pelvic floor.",
      "Incomplete release between rapid contractions.",
      "Holding your breath."
    ],
    "illustrationType": "glute_bridge",
    "defaultRepsOrTime": "15 quick snaps",
    "category": "pelvic"
  },
  "deep_squat_breathing": {
    "id": "deep_squat_breathing",
    "name": "Deep Squat Pelvic Reset",
    "targetMuscles": [
      "Pelvic Floor",
      "Hip Mobility",
      "Glutes"
    ],
    "equipment": "Bodyweight",
    "cue": "Sit deep into your hips, chest tall, breathe air into the bottom of your pelvis.",
    "instructions": [
      "Drop down into a deep ass-to-grass bodyweight squat with heels flat on the floor (hold a doorframe if needed).",
      "Press your elbows against the inside of your knees to pry hips open.",
      "Take slow, deep nasal breaths, consciously directing the breath down into the pelvic bowl.",
      "Feel the pelvic floor stretch, relax, and expand on every inhale."
    ],
    "mistakes": [
      "Heels lifting off the ground.",
      "Rounding the spine forward into a hunch.",
      "Holding tension in the pelvic floor instead of letting it drop."
    ],
    "illustrationType": "goblet_squat",
    "defaultRepsOrTime": "1 min deep reset",
    "category": "pelvic"
  },
  "hip_switches_9090": {
    "id": "hip_switches_9090",
    "name": "90/90 Hip Switches & Lift",
    "targetMuscles": [
      "Hip Mobility",
      "Glutes"
    ],
    "equipment": "Mat / Floor",
    "cue": "Sit tall, rotate through both hip capsules smoothly without using hands.",
    "instructions": [
      "Sit on the floor with legs in 90/90 position: front knee bent at 90°, back knee at 90° behind you.",
      "Keep your spine tall and lift front chest toward the front shin for a glute stretch.",
      "Open the back knee as far as possible before letting the front knee follow, pivoting through the center.",
      "Finish in the opposite 90/90 position with control and repeat."
    ],
    "mistakes": [
      "Slumping shoulders and rounding the thoracic spine.",
      "Rushing the transition without exploring end-range internal rotation.",
      "Collapsing backward onto hands."
    ],
    "illustrationType": "hip_switches_9090",
    "defaultRepsOrTime": "8 reps / side",
    "category": "mobility"
  },
  "worlds_greatest_stretch": {
    "id": "worlds_greatest_stretch",
    "name": "World's Greatest Stretch & Thoracic Opener",
    "targetMuscles": [
      "Hip Mobility",
      "Hamstrings",
      "Back"
    ],
    "equipment": "Mat / Floor",
    "cue": "Lunge deep, drop elbow to instep, open your chest wide to the sky.",
    "instructions": [
      "Step into a deep forward lunge with hands on the floor inside your front foot.",
      "Lower your inside elbow toward your front instep to deeply stretch hip flexors and groin.",
      "Rotate your torso and reach that same hand toward the ceiling, following your hand with your eyes.",
      "Place hand back down, push hips back to straighten front leg for a hamstring floss, then alternate."
    ],
    "mistakes": [
      "Collapsing the back knee onto the floor instead of keeping back leg active.",
      "Rushing the rotation without turning through the thoracic spine.",
      "Letting the front heel lift off the ground."
    ],
    "illustrationType": "bulgarian_split_squat",
    "defaultRepsOrTime": "5 reps / side",
    "category": "mobility"
  },
  "cossack_squat": {
    "id": "cossack_squat",
    "name": "Cossack Squat Lateral Flow",
    "targetMuscles": [
      "Hip Mobility",
      "Quads",
      "Glutes"
    ],
    "equipment": "Bodyweight",
    "cue": "Sit deep into one hip, keep trailing heel down with toes pointed to the ceiling.",
    "instructions": [
      "Stand with feet in a wide sumo stance, toes angled slightly out.",
      "Shift your weight to your right side and squat deep into the right hip while keeping right heel glued to the floor.",
      "Keep the left leg fully extended with toes rotated upward toward the ceiling.",
      "Drive through your right foot to glide across smoothly to the left side without standing all the way up."
    ],
    "mistakes": [
      "Letting the working heel rise off the floor.",
      "Rounding the lower back excessively.",
      "Letting the working knee collapse inward."
    ],
    "illustrationType": "goblet_squat",
    "defaultRepsOrTime": "6 reps / side",
    "category": "mobility"
  },
  "leg_swings": {
    "id": "leg_swings",
    "name": "Standing Leg Swings (Front/Back & Lateral)",
    "targetMuscles": [
      "Hip Mobility",
      "Hamstrings",
      "Glutes"
    ],
    "equipment": "Bodyweight / Wall",
    "cue": "Keep your torso rigid, swing fluidly from the hip socket, not the spine.",
    "instructions": [
      "Stand beside a wall or chair for balance, weight centered on your standing leg.",
      "Swing your free leg forward and backward in a smooth pendulum motion, increasing range gradually.",
      "Turn and face the wall to swing the leg side-to-side across your body to mobilize adductors/abductors.",
      "Keep your standing foot planted and core braced so only the hip moves."
    ],
    "mistakes": [
      "Arching lower back when swinging backward.",
      "Bending the knee excessively.",
      "Twisting the whole torso with the swing."
    ],
    "illustrationType": "bulgarian_split_squat",
    "defaultRepsOrTime": "10 reps each way / side",
    "category": "mobility"
  },
  "deep_squat_hold": {
    "id": "deep_squat_hold",
    "name": "Deep Squat Pry & Ankle Floss",
    "targetMuscles": [
      "Hip Mobility",
      "Calves",
      "Quads"
    ],
    "equipment": "Bodyweight",
    "cue": "Heels down, pry knees apart with elbows, gently shift weight ankle to ankle.",
    "instructions": [
      "Lower down into your deepest comfortable squat position.",
      "Place palms together and use elbows to push knees outward over your toes.",
      "Keep your chest proud and spine long, avoiding collapsing forward.",
      "Gently shift weight slightly from left foot to right foot to floss ankle dorsiflexion."
    ],
    "mistakes": [
      "Allowing heels to lift off the floor.",
      "Slumping shoulders forward into a hunch.",
      "Holding breath."
    ],
    "illustrationType": "goblet_squat",
    "defaultRepsOrTime": "45s × 2 holds",
    "category": "mobility"
  },
  "pigeon_stretch": {
    "id": "pigeon_stretch",
    "name": "Pigeon Pose Glute Opener",
    "targetMuscles": [
      "Hip Mobility",
      "Glutes"
    ],
    "equipment": "Mat / Floor",
    "cue": "Shin across your mat, hips square to the floor, sink deep into the glute.",
    "instructions": [
      "From a push-up or all-fours position, bring your right knee forward and angle right shin across the mat.",
      "Slide your left leg straight back behind you, pointing toes backward.",
      "Square your hips toward the floor and lower your chest down onto your forearms.",
      "Take deep breaths, letting the outer glute and piriformis surrender and lengthen."
    ],
    "mistakes": [
      "Rolling weight onto the right hip cheek instead of keeping hips square.",
      "Forcing the front shin to 90 degrees if knee experiences pain.",
      "Tensing the upper body instead of relaxing forward."
    ],
    "illustrationType": "glute_bridge",
    "defaultRepsOrTime": "45s / side",
    "category": "mobility"
  },
  "couch_stretch": {
    "id": "couch_stretch",
    "name": "Couch Stretch / Hip Flexor & Quad Opener",
    "targetMuscles": [
      "Hip Mobility",
      "Quads"
    ],
    "equipment": "Wall / Chair",
    "cue": "Back shin flat against wall, squeeze glute hard to violently unlock the front hip.",
    "instructions": [
      "Back up to a wall or couch, placing one knee in the corner and shin flat against the wall.",
      "Step the opposite foot forward into a lunge position with knee at 90 degrees.",
      "Squeeze the glute on the back leg as hard as possible and push hips forward.",
      "Slowly bring your torso upright, feeling an intense, restorative stretch through the quad and psoas."
    ],
    "mistakes": [
      "Hyperextending the lower back instead of squeezing the glute.",
      "Letting the back knee slide away from the wall.",
      "Leaning forward to avoid the hip flexor stretch."
    ],
    "illustrationType": "bulgarian_split_squat",
    "defaultRepsOrTime": "45s / side",
    "category": "mobility"
  },
  "goblet_squat": {
    "id": "goblet_squat",
    "name": "Dumbbell Goblet Squat",
    "targetMuscles": [
      "Quads",
      "Glutes",
      "Core"
    ],
    "equipment": "Dumbbells",
    "cue": "Hold dumbbell vertically at sternum, sit between your heels, explode upward.",
    "instructions": [
      "Stand with feet shoulder-width apart, holding a heavy dumbbell cupped vertically at chest height.",
      "Inhale and brace your core, then sit hips back and down between your knees.",
      "Drive knees outward in line with toes until hip crease is parallel with or below knees.",
      "Drive powerfully through your midfoot and heels to return to standing, locking glutes at top."
    ],
    "mistakes": [
      "Rounding the upper back and letting dumbbell pull torso forward.",
      "Allowing knees to cave inward on the ascent.",
      "Lifting heels off the ground."
    ],
    "illustrationType": "goblet_squat",
    "defaultRepsOrTime": "4 × 10",
    "category": "strength"
  },
  "floor_press": {
    "id": "floor_press",
    "name": "Dumbbell Floor Press",
    "targetMuscles": [
      "Chest",
      "Triceps",
      "Shoulders"
    ],
    "equipment": "Dumbbells",
    "cue": "Pause triceps on the floor for 1 second, drive dumbbells up and inward.",
    "instructions": [
      "Lie flat on the floor with knees bent and feet flat, dumbbells positioned at your chest.",
      "Press dumbbells straight up over your chest until elbows are locked.",
      "Lower weights under control with elbows flared at roughly 45 degrees until triceps rest on the floor.",
      "Pause for 1 second on the floor to eliminate bounce, then press powerfully back to lockout."
    ],
    "mistakes": [
      "Bouncing triceps or elbows violently off the floor.",
      "Flaring elbows out at 90 degrees, stressing the shoulder capsule.",
      "Lifting hips off the floor to cheat the weight up."
    ],
    "illustrationType": "floor_press",
    "defaultRepsOrTime": "4 × 10",
    "category": "strength"
  },
  "romanian_deadlift": {
    "id": "romanian_deadlift",
    "name": "Dumbbell Romanian Deadlift (RDL)",
    "targetMuscles": [
      "Hamstrings",
      "Glutes",
      "Back"
    ],
    "equipment": "Dumbbells",
    "cue": "Push hips back like closing a car door with your butt, shave your shins with the weights.",
    "instructions": [
      "Stand tall holding dumbbells in front of your thighs with an overhand grip.",
      "Keep a soft bend in knees, pin shoulder blades back, and push hips backward as far as possible.",
      "Trace dumbbells down tight against your shins until you feel a deep stretch in hamstrings.",
      "Drive hips forward and squeeze glutes aggressively to return to standing lockout."
    ],
    "mistakes": [
      "Squatting down instead of hinging hips backward.",
      "Allowing lower back to round.",
      "Letting dumbbells drift away from legs."
    ],
    "illustrationType": "romanian_deadlift",
    "defaultRepsOrTime": "4 × 10",
    "category": "strength"
  },
  "gorilla_rows": {
    "id": "gorilla_rows",
    "name": "Dumbbell Gorilla Rows",
    "targetMuscles": [
      "Back",
      "Lats",
      "Core"
    ],
    "equipment": "Dumbbells",
    "cue": "Wide hinge stance, push one dumbbell into the floor while ripping the other to your pocket.",
    "instructions": [
      "Place two dumbbells on the floor and stand over them with feet wide in a deep hinge position.",
      "Keep your back flat and chest parallel to the floor.",
      "Press your left hand down into one dumbbell for leverage while driving the right elbow straight up.",
      "Lower under control, tap the floor, and immediately row with the opposite side."
    ],
    "mistakes": [
      "Excessively rotating and twisting the torso to cheat the row.",
      "Rounding the lumbar spine.",
      "Standing up too high instead of maintaining a solid deep hinge."
    ],
    "illustrationType": "bent_over_row",
    "defaultRepsOrTime": "4 × 10 (5/side alternating)",
    "category": "strength"
  },
  "devil_press": {
    "id": "devil_press",
    "name": "Dumbbell Devil Press",
    "targetMuscles": [
      "Cardio / Full Body",
      "Shoulders",
      "Chest",
      "Hamstrings"
    ],
    "equipment": "Dumbbells",
    "cue": "Burpee between dumbbells, jump feet wide, swing and snatch overhead in one fluid arc.",
    "instructions": [
      "Hold dumbbells and drop down into a burpee, lowering chest completely to the floor between weights.",
      "Explosively jump feet wide outside the dumbbells into a strong hinged stance.",
      "In one continuous, athletic motion, swing dumbbells between legs and snap hips to drive them directly overhead.",
      "Lock out overhead with arms straight, then lower weights to floor and immediately begin next rep."
    ],
    "mistakes": [
      "Curling the dumbbells instead of using explosive hip drive.",
      "Rounding lower back during the snatch transition.",
      "Pacing too slowly — maintain athletic rhythm."
    ],
    "illustrationType": "arnold_press",
    "defaultRepsOrTime": "3 × 8 reps",
    "category": "athletic"
  },
  "lateral_raise": {
    "id": "lateral_raise",
    "name": "Dumbbell Lateral Raise",
    "targetMuscles": [
      "Shoulders"
    ],
    "equipment": "Dumbbells",
    "cue": "Slight torso forward lean, lead with elbows, pour the pitchers at the top.",
    "instructions": [
      "Stand tall with dumbbells at sides, hinge forward 5–10 degrees at the hips.",
      "With a slight bend in elbows, raise arms out to the sides in the scapular plane.",
      "Lead with your elbows and ensure wrists do not rise above elbows at parallel.",
      "Lower weights slowly over 2–3 seconds to maintain constant tension on the side delts."
    ],
    "mistakes": [
      "Using swinging body momentum to hoist weights up.",
      "Shrugging traps up toward ears.",
      "Lifting hands higher than elbows."
    ],
    "illustrationType": "lateral_raise",
    "defaultRepsOrTime": "3 × 15 reps",
    "category": "strength"
  },
  "hammer_curls": {
    "id": "hammer_curls",
    "name": "Dumbbell Hammer Curls",
    "targetMuscles": [
      "Biceps",
      "Forearms"
    ],
    "equipment": "Dumbbells",
    "cue": "Palms facing each other, pin elbows to ribs, squeeze the forearm and bicep peak.",
    "instructions": [
      "Stand upright holding dumbbells with a neutral grip (palms facing inward toward each other).",
      "Pin elbows securely against your torso and keep upper arms motionless.",
      "Curl dumbbells upward simultaneously until forearms compress against biceps.",
      "Squeeze hard at the peak for 1 second, then lower under control to full extension."
    ],
    "mistakes": [
      "Swinging torso backward to generate momentum.",
      "Letting elbows drift forward away from the body.",
      "Dropping the weight quickly without controlling the eccentric phase."
    ],
    "illustrationType": "hammer_curls",
    "defaultRepsOrTime": "3 × 12 reps",
    "category": "strength"
  },
  "db_clean_push_press": {
    "id": "db_clean_push_press",
    "name": "Dumbbell Clean & Push Press",
    "targetMuscles": [
      "Shoulders",
      "Glutes",
      "Hamstrings",
      "Cardio / Full Body"
    ],
    "equipment": "Dumbbells",
    "cue": "Hang clean to shoulders, quick dip of knees, launch weights overhead.",
    "instructions": [
      "Hold dumbbells at mid-thigh in a slight hinge position.",
      "Violently extend hips and shrug shoulders to clean dumbbells up onto your shoulders.",
      "Immediately dip knees 2–3 inches into a quarter squat, then explosively drive legs up.",
      "Channel the upward momentum to press the dumbbells overhead into a locked-out position."
    ],
    "mistakes": [
      "Reverse curling the clean instead of using hip explosion.",
      "Arching lower back backward during the press.",
      "Pausing too long between the clean and the push press."
    ],
    "illustrationType": "arnold_press",
    "defaultRepsOrTime": "4 × 8 reps",
    "category": "athletic"
  },
  "single_leg_rdl": {
    "id": "single_leg_rdl",
    "name": "Single-Leg Dumbbell RDL",
    "targetMuscles": [
      "Hamstrings",
      "Glutes",
      "Core"
    ],
    "equipment": "Dumbbells",
    "cue": "Kick rear heel straight back like a lever, hinge until chest is parallel to floor.",
    "instructions": [
      "Hold a dumbbell in one or both hands, balancing on your working leg with a soft knee.",
      "Hinge forward from the hip, reaching your non-working leg straight behind you in line with your spine.",
      "Lower dumbbell toward the floor until you feel maximum tension in the working hamstring.",
      "Drive through the working heel and fire your glute to return to an upright standing posture."
    ],
    "mistakes": [
      "Opening or flaring the back hip toward the ceiling (keep hips square to floor).",
      "Rounding the spine.",
      "Locking out the working knee stiffly."
    ],
    "illustrationType": "romanian_deadlift",
    "defaultRepsOrTime": "3 × 8/side",
    "category": "strength"
  },
  "db_front_squat": {
    "id": "db_front_squat",
    "name": "Dual Dumbbell Front Squat",
    "targetMuscles": [
      "Quads",
      "Glutes",
      "Core"
    ],
    "equipment": "Dumbbells",
    "cue": "Rest dumbbells on front delts, drive elbows high, sit straight down between ankles.",
    "instructions": [
      "Clean two dumbbells onto your shoulders, resting one end on your front delts with elbows held high.",
      "Stand shoulder-width apart, brace your abs, and squat down deep while keeping torso ultra-upright.",
      "Descend until thighs break parallel, keeping elbows elevated to prevent weights pulling you forward.",
      "Drive out of the hole aggressively through the whole foot."
    ],
    "mistakes": [
      "Dropping elbows down, which collapses the chest forward.",
      "Lifting heels off the ground.",
      "Failing to reach full depth."
    ],
    "illustrationType": "goblet_squat",
    "defaultRepsOrTime": "3 × 10 reps",
    "category": "strength"
  },
  "bent_over_row": {
    "id": "bent_over_row",
    "name": "Dumbbell Bent-Over Row",
    "targetMuscles": [
      "Back",
      "Lats",
      "Biceps"
    ],
    "equipment": "Dumbbells",
    "cue": "Hinged at 45°, pull elbows toward your hip pockets, squeeze shoulder blades.",
    "instructions": [
      "Hinge forward at the hips until your torso is at roughly 45 degrees, back flat, knees soft.",
      "Hold dumbbells hanging at arms length with palms facing each other.",
      "Drive elbows up and back toward your hip pockets, pulling dumbbells to the lower ribcage.",
      "Squeeze your lats and middle back hard at the peak, then lower weights with full control."
    ],
    "mistakes": [
      "Rounding lower back or standing too upright.",
      "Yanking weight with body momentum.",
      "Shrugging shoulders into neck instead of using lats."
    ],
    "illustrationType": "bent_over_row",
    "defaultRepsOrTime": "3 × 10 reps",
    "category": "strength"
  },
  "renegade_rows": {
    "id": "renegade_rows",
    "name": "Dumbbell Renegade Rows into Push-Up",
    "targetMuscles": [
      "Back",
      "Chest",
      "Core",
      "Triceps"
    ],
    "equipment": "Dumbbells",
    "cue": "Feet wide for stability, row dumbbell without rotating hips, drop into a strict push-up.",
    "instructions": [
      "Set up in a push-up position with hands gripping hex dumbbells and feet placed wider than shoulder-width.",
      "Lock core rigid, press left dumbbell into floor and row right dumbbell to your hip. Return under control.",
      "Row left dumbbell to hip and return under control.",
      "Perform a full, strict push-up down to dumbbell handle height and press back up. That is 1 rep."
    ],
    "mistakes": [
      "Allowing hips to rotate or sway side-to-side during the rows.",
      "Piking hips into the air.",
      "Sagging lumbar spine during the push-up."
    ],
    "illustrationType": "bent_over_row",
    "defaultRepsOrTime": "3 × 8 reps / side",
    "category": "athletic"
  },
  "db_overhead_tricep": {
    "id": "db_overhead_tricep",
    "name": "Overhead Dumbbell Tricep Extension",
    "targetMuscles": [
      "Triceps"
    ],
    "equipment": "Dumbbells",
    "cue": "Elbows pointing forward and tucked in, full deep stretch behind neck, flare-less press.",
    "instructions": [
      "Stand or sit tall, holding one heavy dumbbell vertically overhead with both hands cupping the top plate.",
      "Keeping upper arms pinned close to your ears, lower the dumbbell behind your head until forearms touch biceps.",
      "Feel a deep stretch in the long head of the triceps at the bottom.",
      "Contract triceps powerfully to press the weight back up to full overhead lockout."
    ],
    "mistakes": [
      "Flaring elbows outward away from head.",
      "Arching lower back to compensate for poor shoulder mobility.",
      "Shortchanging the deep stretch at the bottom."
    ],
    "illustrationType": "arnold_press",
    "defaultRepsOrTime": "3 × 12 reps",
    "category": "strength"
  },
  "bicep_curls": {
    "id": "bicep_curls",
    "name": "Supinating Dumbbell Bicep Curls",
    "targetMuscles": [
      "Biceps",
      "Forearms"
    ],
    "equipment": "Dumbbells",
    "cue": "Start neutral, rotate palms up and outward at peak for maximum bicep ball contraction.",
    "instructions": [
      "Stand tall with dumbbells hanging at sides, palms facing inward.",
      "As you curl dumbbells upward, rotate wrists so palms face the ceiling by mid-repetition.",
      "At the top of the curl, turn your pinky finger slightly outward to maximize the bicep peak contraction.",
      "Lower slowly over 3 seconds, untwisting wrists back to neutral at the bottom."
    ],
    "mistakes": [
      "Swinging hips or leaning back.",
      "Moving elbows forward instead of keeping them anchored at sides.",
      "Failing to fully supinate the wrists."
    ],
    "illustrationType": "hammer_curls",
    "defaultRepsOrTime": "3 × 12 reps",
    "category": "strength"
  },
  "bulgarian_split_squat": {
    "id": "bulgarian_split_squat",
    "name": "Bulgarian Split Squat",
    "targetMuscles": [
      "Quads",
      "Glutes",
      "Hamstrings"
    ],
    "equipment": "Dumbbells",
    "cue": "Rear laces flat on bench, sink straight down, drive through front heel.",
    "instructions": [
      "Stand 2 feet in front of a bench or chair, resting top of rear foot flat on the surface.",
      "Hold dumbbells at sides with tall posture, brace core, and lower hips down and slightly back.",
      "Descend until front thigh is parallel to floor and rear knee hovers just above ground.",
      "Drive aggressively through front heel and midfoot to return to top without locking out fully."
    ],
    "mistakes": [
      "Front foot placed too close, causing heel to peel off floor.",
      "Torso collapsing forward onto front quad.",
      "Pushing through the rear foot instead of loading the front leg."
    ],
    "illustrationType": "bulgarian_split_squat",
    "defaultRepsOrTime": "3 × 8/side",
    "category": "strength"
  },
  "close_grip_press": {
    "id": "close_grip_press",
    "name": "Close-Grip Dumbbell Floor Press",
    "targetMuscles": [
      "Triceps",
      "Chest"
    ],
    "equipment": "Dumbbells",
    "cue": "Squeeze dumbbells together touching above chest, keep them glued all the way down and up.",
    "instructions": [
      "Lie on floor with knees bent and hold dumbbells pressed firmly together over your mid-chest.",
      "Keep dumbbells actively crushed together as you lower until your elbows tap the floor.",
      "Pause for a split second on the floor while maintaining continuous inward chest and tricep pressure.",
      "Press dumbbells back up explosively, squeezing triceps and inner chest at the top."
    ],
    "mistakes": [
      "Allowing dumbbells to separate apart.",
      "Bouncing elbows off floor.",
      "Flaring elbows out instead of keeping them tucked close to torso."
    ],
    "illustrationType": "floor_press",
    "defaultRepsOrTime": "3 × 10 reps",
    "category": "strength"
  },
  "arnold_press": {
    "id": "arnold_press",
    "name": "Arnold Press",
    "targetMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": "Dumbbells",
    "cue": "Palms face chest at bottom, rotate 180 degrees into full overhead press.",
    "instructions": [
      "Hold dumbbells at shoulder level with elbows tucked and palms facing your chest.",
      "As you press upward, rotate wrists so palms face forward by the time you reach mid-press.",
      "Lock out overhead with arms straight and bicep beside ear.",
      "Reverse the rotational movement under control as you lower back to starting position."
    ],
    "mistakes": [
      "Arching lower back to push weights overhead.",
      "Rotating too early before weights begin rising.",
      "Dropping dumbbells quickly without controlling the descent."
    ],
    "illustrationType": "arnold_press",
    "defaultRepsOrTime": "3 × 10 reps",
    "category": "strength"
  },
  "woodchoppers": {
    "id": "woodchoppers",
    "name": "Dumbbell Rotational Woodchoppers",
    "targetMuscles": [
      "Obliques",
      "Core",
      "Shoulders"
    ],
    "equipment": "Dumbbells",
    "cue": "Pivot back foot, swing dumbbell diagonally across torso with athletic hip drive.",
    "instructions": [
      "Stand with feet wider than shoulder-width, holding one dumbbell with both hands outside your right hip.",
      "Pivot on your right ball of foot and rotate your torso, swinging dumbbell diagonally up across chest.",
      "Lock arms out over your left shoulder with core clamped tight.",
      "Control the descent back down to the right hip and repeat for all reps before switching sides."
    ],
    "mistakes": [
      "Swinging strictly with arms instead of driving from the hips and obliques.",
      "Failing to pivot the rear foot, placing shearing force on the knee.",
      "Rounding the spine."
    ],
    "illustrationType": "arnold_press",
    "defaultRepsOrTime": "3 × 10/side",
    "category": "athletic"
  },
  "farmers_carry": {
    "id": "farmers_carry",
    "name": "Dumbbell Farmer's March",
    "targetMuscles": [
      "Core",
      "Forearms",
      "Traps",
      "Glutes"
    ],
    "equipment": "Dumbbells",
    "cue": "Heavy dumbbells at sides, tall posture, march with high knees and zero sway.",
    "instructions": [
      "Pick up your heaviest dumbbells and stand tall with shoulders pulled down and back.",
      "Brace your abdominal wall and March in place, lifting each knee up to hip height under control.",
      "Maintain an unbroken vertical spine without tilting or swaying from side to side.",
      "Crush the dumbbell handles to build monstrous forearm grip strength."
    ],
    "mistakes": [
      "Shrugging shoulders into ears.",
      "Slumping chest forward.",
      "Walking or marching with swaying, sloppy hips."
    ],
    "illustrationType": "side_plank",
    "defaultRepsOrTime": "3 × 45s march",
    "category": "athletic"
  },
  "rear_delt_fly": {
    "id": "rear_delt_fly",
    "name": "Dumbbell Rear Delt Fly",
    "targetMuscles": [
      "Shoulders",
      "Back"
    ],
    "equipment": "Dumbbells",
    "cue": "Hinge deep, sweep dumbbells wide like wings, squeeze the back of your shoulders.",
    "instructions": [
      "Hinge at hips until torso is nearly parallel to floor, back flat and knees soft.",
      "Hold light dumbbells hanging down with pinkies turned slightly outward.",
      "With a slight bend in elbows, pull arms out and up in a wide arc until level with shoulders.",
      "Squeeze the rear deltoids at peak for 1 second, then lower under slow control."
    ],
    "mistakes": [
      "Using body bounce or momentum to swing weights.",
      "Using too much weight and turning it into a row.",
      "Lifting torso up during the rep."
    ],
    "illustrationType": "lateral_raise",
    "defaultRepsOrTime": "3 × 15 reps",
    "category": "strength"
  },
  "mike_tyson_pushups": {
    "id": "mike_tyson_pushups",
    "name": "Mike Tyson Push-Ups",
    "targetMuscles": [
      "Chest",
      "Shoulders",
      "Quads",
      "Core"
    ],
    "equipment": "Mat / Floor",
    "cue": "Push-up, then sit back into your heels like a loaded spring before launching forward.",
    "instructions": [
      "Start in a standard push-up position with feet pushed flat against a wall or firmly planted on floor.",
      "Lower chest down into a strict, controlled push-up until hovering 1 inch off the ground.",
      "As you press up, push backward, bending your knees to sit hips back toward your heels into a crouch.",
      "Spring forward athletically back into the top push-up position and immediately drop into next rep."
    ],
    "mistakes": [
      "Sagging the lower back during the push-up phase.",
      "Shortchanging the deep knee bend and backward spring.",
      "Moving in disconnected jerks instead of a fluid wave."
    ],
    "illustrationType": "mike_tyson_pushups",
    "defaultRepsOrTime": "3 × 10 reps",
    "category": "athletic"
  },
  "db_sumo_squat": {
    "id": "db_sumo_squat",
    "name": "Dumbbell Sumo Squat",
    "targetMuscles": [
      "Glutes",
      "Quads",
      "Hamstrings"
    ],
    "equipment": "Dumbbells",
    "cue": "Wide stance, toes pointed 45 degrees out, drive knees out, crush adductors & glutes.",
    "instructions": [
      "Stand with feet wide (1.5x shoulder width) with toes angled outward at 45 degrees.",
      "Hold a heavy dumbbell hanging vertically between legs with both hands.",
      "Keep torso upright, sit hips back and down, forcing knees to track wide over your toes.",
      "Drive through your heels to return to standing, locking glutes tightly at the top."
    ],
    "mistakes": [
      "Letting knees cave inward instead of pushing out.",
      "Leaning too far forward.",
      "Not squatting deep enough."
    ],
    "illustrationType": "goblet_squat",
    "defaultRepsOrTime": "3 × 10 reps",
    "category": "strength"
  },
  "db_hang_snatch": {
    "id": "db_hang_snatch",
    "name": "Alternating Dumbbell Hang Snatch",
    "targetMuscles": [
      "Cardio / Full Body",
      "Shoulders",
      "Glutes",
      "Back"
    ],
    "equipment": "Dumbbells",
    "cue": "Hinge to knees, jump and pop hips, punch dumbbell straight to ceiling in one motion.",
    "instructions": [
      "Stand with feet hip-width apart, holding dumbbell between legs with an overhand grip.",
      "Hinge hips slightly until dumbbell is at knee level.",
      "Explode upward through hips and ankles, high-pulling dumbbell close to body and punching it straight overhead.",
      "Catch with locked arm overhead, lower back to chest, and switch hands at bottom."
    ],
    "mistakes": [
      "Swinging weight outward like a kettlebell instead of pulling close up the body.",
      "Using arm strength instead of violent hip extension.",
      "Arching lower back on overhead catch."
    ],
    "illustrationType": "arnold_press",
    "defaultRepsOrTime": "3 × 6/side",
    "category": "athletic"
  },
  "upright_row": {
    "id": "upright_row",
    "name": "Dumbbell Upright Row / High Pull",
    "targetMuscles": [
      "Shoulders",
      "Back",
      "Traps"
    ],
    "equipment": "Dumbbells",
    "cue": "Lead with elbows high, pull dumbbells to upper chest, slow 2s descent.",
    "instructions": [
      "Stand tall holding dumbbells in front of thighs with palms facing you.",
      "Pull dumbbells upward along the front of your torso, keeping elbows higher than wrists at all times.",
      "Pause when dumbbells reach upper chest height, feeling side delts and upper traps contract.",
      "Lower under strict control back to starting position."
    ],
    "mistakes": [
      "Lifting wrists higher than elbows.",
      "Using swinging momentum.",
      "Pulling too high into neck, causing impingement."
    ],
    "illustrationType": "lateral_raise",
    "defaultRepsOrTime": "3 × 12 reps",
    "category": "strength"
  },
  "db_thrusters": {
    "id": "db_thrusters",
    "name": "Dumbbell Thrusters (Squat to Overhead Press)",
    "targetMuscles": [
      "Cardio / Full Body",
      "Quads",
      "Shoulders",
      "Glutes"
    ],
    "equipment": "Dumbbells",
    "cue": "Full deep squat, use upward leg explosion to launch dumbbells straight overhead.",
    "instructions": [
      "Hold dumbbells racked at shoulder height, standing shoulder-width apart.",
      "Descend into a full deep squat, hips below knees, chest upright.",
      "Explosively stand up out of the squat, using that momentum to press dumbbells overhead in one fluid arc.",
      "Lower weights back to shoulders smoothly as you descend into the next squat repetition."
    ],
    "mistakes": [
      "Pausing at the top of the squat before pressing (must be one continuous explosive movement).",
      "Caving knees inward.",
      "Shortchanging squat depth."
    ],
    "illustrationType": "goblet_squat",
    "defaultRepsOrTime": "4 × 8 reps",
    "category": "athletic"
  },
  "reverse_lunges": {
    "id": "reverse_lunges",
    "name": "Alternating Dumbbell Reverse Lunges",
    "targetMuscles": [
      "Quads",
      "Glutes",
      "Hamstrings"
    ],
    "equipment": "Dumbbells",
    "cue": "Step back with control, kiss back knee to floor, drive up through front heel.",
    "instructions": [
      "Stand tall holding dumbbells at your sides.",
      "Take a large, controlled step backward with your right leg.",
      "Lower hips until front thigh is parallel to floor and rear knee gently kisses the mat.",
      "Drive powerfully through your front heel to step back forward, then switch legs."
    ],
    "mistakes": [
      "Slamming back knee hard into the ground.",
      "Front knee caving inward or tracking way past toes.",
      "Leaning torso excessively forward."
    ],
    "illustrationType": "bulgarian_split_squat",
    "defaultRepsOrTime": "3 × 10/side",
    "category": "strength"
  },
  "man_makers": {
    "id": "man_makers",
    "name": "Dumbbell Man-Makers",
    "targetMuscles": [
      "Cardio / Full Body",
      "Chest",
      "Back",
      "Shoulders",
      "Quads"
    ],
    "equipment": "Dumbbells",
    "cue": "Push-up, Row L, Row R, Jump in, Clean to squat, and Thruster overhead.",
    "instructions": [
      "Drop to plank holding dumbbells. Do a strict push-up.",
      "At top of push-up, perform a right-arm row, then a left-arm row.",
      "Jump feet forward outside dumbbells into a squat.",
      "Clean dumbbells to shoulders, squat deep, and explode into an overhead thruster. That is 1 rep."
    ],
    "mistakes": [
      "Allowing hips to rotate during the rows.",
      "Rushing through individual movements with sloppy form.",
      "Using weights that are too heavy to complete fluidly."
    ],
    "illustrationType": "arnold_press",
    "defaultRepsOrTime": "3 × 6 reps",
    "category": "athletic"
  },
  "glute_bridge": {
    "id": "glute_bridge",
    "name": "Weighted Dumbbell Glute Bridge",
    "targetMuscles": [
      "Glutes",
      "Hamstrings",
      "Core"
    ],
    "equipment": "Dumbbells",
    "cue": "Rest dumbbell across hips, drive heels into floor, lock glutes for 2 seconds at top.",
    "instructions": [
      "Lie on floor with knees bent and feet flat on the ground hip-width apart.",
      "Place a heavy dumbbell horizontally across your hips, holding it securely with hands.",
      "Drive heels through the floor and extend hips toward the ceiling until thighs and torso align.",
      "Squeeze glutes with maximum force for 2 seconds at the peak before lowering under control."
    ],
    "mistakes": [
      "Hyperextending the lumbar spine instead of using glute extension.",
      "Letting knees cave inward.",
      "Pushing through toes instead of heels."
    ],
    "illustrationType": "glute_bridge",
    "defaultRepsOrTime": "3 × 15 reps",
    "category": "strength"
  }
};

export const WEEKLY_SCHEDULE: Record<string, DayPlan> = {
  "Mon": {
    "dayKey": "Mon",
    "fullName": "Monday",
    "morning": {
      "skipping": {
        "title": "Skipping — HIIT Sprint Intervals",
        "duration": "10 × (45s fast / 30s easy bounce)",
        "cue": "High cadence, turn rope from wrists, light on feet."
      },
      "abs": [
        {
          "exerciseId": "hollow_body_hold",
          "prescription": "3 × 35s"
        },
        {
          "exerciseId": "rkc_plank",
          "prescription": "3 × 30s"
        }
      ],
      "pelvic": [
        {
          "exerciseId": "diaphragmatic_breathing",
          "prescription": "1 min",
          "cue": "Exhale fully, vacuum navel to spine, hold 10s."
        },
        {
          "exerciseId": "slow_kegels",
          "prescription": "10 reps (5s hold / 5s rest)",
          "cue": "Elevator lift, hold 5s with maximum force, full 5s release."
        },
        {
          "exerciseId": "quick_flicks",
          "prescription": "15 quick snaps",
          "cue": "Fast 1s snap squeeze, immediate release, build fast-twitch control."
        },
        {
          "exerciseId": "deep_squat_breathing",
          "prescription": "1 min deep reset",
          "cue": "Deep ATG squat, breathe air into pelvic bowl, expand & decompress."
        }
      ],
      "mobility": [
        {
          "exerciseId": "hip_switches_9090",
          "prescription": "8/side",
          "cue": "Sit tall, rotate hip capsules smoothly without hands."
        },
        {
          "exerciseId": "worlds_greatest_stretch",
          "prescription": "5/side",
          "cue": "Lunge deep, drop elbow to instep, open wide to sky."
        },
        {
          "exerciseId": "cossack_squat",
          "prescription": "6/side",
          "cue": "Sit deep into one hip, trailing heel down with toes up."
        },
        {
          "exerciseId": "deep_squat_hold",
          "prescription": "45s × 2",
          "cue": "Pry knees open with elbows, shift weight ankle to ankle."
        }
      ]
    },
    "evening": {
      "label": "Full-Body Day 1 — Power & Density (Quad & Chest Focus)",
      "subtitle": "Full-body dumbbell supersets and athletic power conditioning",
      "finisher": "Finisher: 3 rounds — 15 Lateral Raises + 12 Hammer Curls (No rest between exercises)",
      "groups": [
        {
          "name": "Superset A (Quad & Chest)",
          "restNote": "Do in pairs, 60–75s rest after each pair (4 rounds)",
          "exercises": [
            {
              "exerciseId": "goblet_squat",
              "prescription": "4 × 10"
            },
            {
              "exerciseId": "floor_press",
              "prescription": "4 × 10"
            }
          ]
        },
        {
          "name": "Superset B (Hinge & Lats)",
          "restNote": "Do in pairs, 60–75s rest after each pair (3 rounds)",
          "exercises": [
            {
              "exerciseId": "romanian_deadlift",
              "prescription": "3 × 10"
            },
            {
              "exerciseId": "gorilla_rows",
              "prescription": "3 × 10"
            }
          ]
        },
        {
          "name": "Athletic Conditioning Complex",
          "restNote": "60s rest between sets (3 rounds)",
          "exercises": [
            {
              "exerciseId": "devil_press",
              "prescription": "3 × 8"
            }
          ]
        }
      ]
    }
  },
  "Tue": {
    "dayKey": "Tue",
    "fullName": "Tuesday",
    "morning": {
      "skipping": {
        "title": "Skipping — Boxer Shuffle & Rhythm",
        "duration": "15 min continuous aerobic flow",
        "cue": "High cadence, turn rope from wrists, light on feet."
      },
      "abs": [
        {
          "exerciseId": "side_plank",
          "prescription": "3 × 35s/side"
        },
        {
          "exerciseId": "copenhagen_plank",
          "prescription": "3 × 20s/side"
        }
      ],
      "pelvic": [
        {
          "exerciseId": "diaphragmatic_breathing",
          "prescription": "1 min",
          "cue": "Exhale fully, vacuum navel to spine, hold 10s."
        },
        {
          "exerciseId": "slow_kegels",
          "prescription": "10 reps (5s hold / 5s rest)",
          "cue": "Elevator lift, hold 5s with maximum force, full 5s release."
        },
        {
          "exerciseId": "quick_flicks",
          "prescription": "15 quick snaps",
          "cue": "Fast 1s snap squeeze, immediate release, build fast-twitch control."
        },
        {
          "exerciseId": "deep_squat_breathing",
          "prescription": "1 min deep reset",
          "cue": "Deep ATG squat, breathe air into pelvic bowl, expand & decompress."
        }
      ],
      "mobility": [
        {
          "exerciseId": "hip_switches_9090",
          "prescription": "8/side",
          "cue": "Sit tall, rotate hip capsules smoothly without hands."
        },
        {
          "exerciseId": "worlds_greatest_stretch",
          "prescription": "5/side",
          "cue": "Lunge deep, drop elbow to instep, open wide to sky."
        },
        {
          "exerciseId": "cossack_squat",
          "prescription": "6/side",
          "cue": "Sit deep into one hip, trailing heel down with toes up."
        },
        {
          "exerciseId": "deep_squat_hold",
          "prescription": "45s × 2",
          "cue": "Pry knees open with elbows, shift weight ankle to ankle."
        }
      ]
    },
    "evening": {
      "label": "Full-Body Day 2 — Posterior Chain & Overhead Power (Hinge & Shoulders Focus)",
      "subtitle": "Full-body dumbbell supersets and athletic power conditioning",
      "finisher": "Finisher: 3 rounds — 12 Overhead Dumbbell Tricep Extensions + 12 Supinating Bicep Curls",
      "groups": [
        {
          "name": "Superset A (Clean, Press & Single Leg)",
          "restNote": "Do in pairs, 60–75s rest after each pair (4 rounds)",
          "exercises": [
            {
              "exerciseId": "db_clean_push_press",
              "prescription": "4 × 8"
            },
            {
              "exerciseId": "single_leg_rdl",
              "prescription": "3 × 8/side"
            }
          ]
        },
        {
          "name": "Superset B (Front Squat & Rows)",
          "restNote": "Do in pairs, 60–75s rest after each pair (3 rounds)",
          "exercises": [
            {
              "exerciseId": "db_front_squat",
              "prescription": "3 × 10"
            },
            {
              "exerciseId": "bent_over_row",
              "prescription": "3 × 10"
            }
          ]
        },
        {
          "name": "Athletic Core & Chest Complex",
          "restNote": "60s rest between sets (3 rounds)",
          "exercises": [
            {
              "exerciseId": "renegade_rows",
              "prescription": "3 × 8/side"
            }
          ]
        }
      ]
    }
  },
  "Wed": {
    "dayKey": "Wed",
    "fullName": "Wednesday",
    "morning": {
      "skipping": {
        "title": "Skipping — Tabata Sprint Pyramids",
        "duration": "8 rounds (20s all-out sprint / 10s rest)",
        "cue": "High cadence, turn rope from wrists, light on feet."
      },
      "abs": [
        {
          "exerciseId": "suitcase_hold",
          "prescription": "3 × 35s/side"
        },
        {
          "exerciseId": "wall_sit_hold",
          "prescription": "3 × 45s"
        }
      ],
      "pelvic": [
        {
          "exerciseId": "diaphragmatic_breathing",
          "prescription": "1 min",
          "cue": "Exhale fully, vacuum navel to spine, hold 10s."
        },
        {
          "exerciseId": "slow_kegels",
          "prescription": "10 reps (5s hold / 5s rest)",
          "cue": "Elevator lift, hold 5s with maximum force, full 5s release."
        },
        {
          "exerciseId": "quick_flicks",
          "prescription": "15 quick snaps",
          "cue": "Fast 1s snap squeeze, immediate release, build fast-twitch control."
        },
        {
          "exerciseId": "deep_squat_breathing",
          "prescription": "1 min deep reset",
          "cue": "Deep ATG squat, breathe air into pelvic bowl, expand & decompress."
        }
      ],
      "mobility": [
        {
          "exerciseId": "hip_switches_9090",
          "prescription": "8/side",
          "cue": "Sit tall, rotate hip capsules smoothly without hands."
        },
        {
          "exerciseId": "worlds_greatest_stretch",
          "prescription": "5/side",
          "cue": "Lunge deep, drop elbow to instep, open wide to sky."
        },
        {
          "exerciseId": "cossack_squat",
          "prescription": "6/side",
          "cue": "Sit deep into one hip, trailing heel down with toes up."
        },
        {
          "exerciseId": "deep_squat_hold",
          "prescription": "45s × 2",
          "cue": "Pry knees open with elbows, shift weight ankle to ankle."
        }
      ]
    },
    "evening": {
      "label": "Full-Body Day 3 — Unilateral & Rotational Athleticism (Split Stance & Obliques)",
      "subtitle": "Full-body dumbbell supersets and athletic power conditioning",
      "finisher": "Finisher: 3 rounds — 15 Rear Delt Flyes + 45s Farmers March",
      "groups": [
        {
          "name": "Superset A (Unilateral Legs & Triceps)",
          "restNote": "Do in pairs, 60–75s rest after each pair (3 rounds)",
          "exercises": [
            {
              "exerciseId": "bulgarian_split_squat",
              "prescription": "3 × 8/side"
            },
            {
              "exerciseId": "close_grip_press",
              "prescription": "3 × 10"
            }
          ]
        },
        {
          "name": "Superset B (Posterior & 3D Delts)",
          "restNote": "Do in pairs, 60–75s rest after each pair (3 rounds)",
          "exercises": [
            {
              "exerciseId": "romanian_deadlift",
              "prescription": "3 × 10"
            },
            {
              "exerciseId": "arnold_press",
              "prescription": "3 × 10"
            }
          ]
        },
        {
          "name": "Athletic Rotational Core",
          "restNote": "45s rest between sets (3 rounds)",
          "exercises": [
            {
              "exerciseId": "woodchoppers",
              "prescription": "3 × 10/side"
            }
          ]
        }
      ]
    }
  },
  "Thu": {
    "dayKey": "Thu",
    "fullName": "Thursday",
    "morning": {
      "skipping": {
        "title": "Skipping — High-Knee & Double-Under Prep",
        "duration": "10 × (40s power jumps / 30s rest)",
        "cue": "High cadence, turn rope from wrists, light on feet."
      },
      "abs": [
        {
          "exerciseId": "dead_bugs",
          "prescription": "3 × 10/side (3s pause)"
        },
        {
          "exerciseId": "bear_crawl_hold",
          "prescription": "3 × 40s"
        }
      ],
      "pelvic": [
        {
          "exerciseId": "diaphragmatic_breathing",
          "prescription": "1 min",
          "cue": "Exhale fully, vacuum navel to spine, hold 10s."
        },
        {
          "exerciseId": "slow_kegels",
          "prescription": "10 reps (5s hold / 5s rest)",
          "cue": "Elevator lift, hold 5s with maximum force, full 5s release."
        },
        {
          "exerciseId": "quick_flicks",
          "prescription": "15 quick snaps",
          "cue": "Fast 1s snap squeeze, immediate release, build fast-twitch control."
        },
        {
          "exerciseId": "deep_squat_breathing",
          "prescription": "1 min deep reset",
          "cue": "Deep ATG squat, breathe air into pelvic bowl, expand & decompress."
        }
      ],
      "mobility": [
        {
          "exerciseId": "hip_switches_9090",
          "prescription": "8/side",
          "cue": "Sit tall, rotate hip capsules smoothly without hands."
        },
        {
          "exerciseId": "worlds_greatest_stretch",
          "prescription": "5/side",
          "cue": "Lunge deep, drop elbow to instep, open wide to sky."
        },
        {
          "exerciseId": "cossack_squat",
          "prescription": "6/side",
          "cue": "Sit deep into one hip, trailing heel down with toes up."
        },
        {
          "exerciseId": "deep_squat_hold",
          "prescription": "45s × 2",
          "cue": "Pry knees open with elbows, shift weight ankle to ankle."
        }
      ]
    },
    "evening": {
      "label": "Full-Body Day 4 — Hypertrophy & Time Under Tension (Slow Eccentrics)",
      "subtitle": "Full-body dumbbell supersets and athletic power conditioning",
      "finisher": "Finisher: 3 rounds — 12 Upright Rows + 12 Hammer Curls (2s negative on every rep)",
      "groups": [
        {
          "name": "Superset A (Adductors, Chest & Back Push)",
          "restNote": "Do in pairs, 60–75s rest after each pair (3 rounds)",
          "exercises": [
            {
              "exerciseId": "db_sumo_squat",
              "prescription": "3 × 10"
            },
            {
              "exerciseId": "mike_tyson_pushups",
              "prescription": "3 × 10"
            }
          ]
        },
        {
          "name": "Superset B (Heavy Hinges & Lats)",
          "restNote": "Do in pairs, 60–75s rest after each pair (3 rounds)",
          "exercises": [
            {
              "exerciseId": "romanian_deadlift",
              "prescription": "3 × 10 (3s lower)"
            },
            {
              "exerciseId": "bent_over_row",
              "prescription": "3 × 10"
            }
          ]
        },
        {
          "name": "Explosive Athletic Snatch Complex",
          "restNote": "60s rest between sets (3 rounds)",
          "exercises": [
            {
              "exerciseId": "db_hang_snatch",
              "prescription": "3 × 6/side"
            }
          ]
        }
      ]
    }
  },
  "Fri": {
    "dayKey": "Fri",
    "fullName": "Friday",
    "morning": {
      "skipping": {
        "title": "Skipping — Fat-Oxidation Aerobic Flow",
        "duration": "15 min steady conversational pace",
        "cue": "High cadence, turn rope from wrists, light on feet."
      },
      "abs": [
        {
          "exerciseId": "bird_dogs",
          "prescription": "3 × 10/side (3s pause)"
        },
        {
          "exerciseId": "l_sit_tuck",
          "prescription": "3 × 20s"
        }
      ],
      "pelvic": [
        {
          "exerciseId": "diaphragmatic_breathing",
          "prescription": "1 min",
          "cue": "Exhale fully, vacuum navel to spine, hold 10s."
        },
        {
          "exerciseId": "slow_kegels",
          "prescription": "10 reps (5s hold / 5s rest)",
          "cue": "Elevator lift, hold 5s with maximum force, full 5s release."
        },
        {
          "exerciseId": "quick_flicks",
          "prescription": "15 quick snaps",
          "cue": "Fast 1s snap squeeze, immediate release, build fast-twitch control."
        },
        {
          "exerciseId": "deep_squat_breathing",
          "prescription": "1 min deep reset",
          "cue": "Deep ATG squat, breathe air into pelvic bowl, expand & decompress."
        }
      ],
      "mobility": [
        {
          "exerciseId": "hip_switches_9090",
          "prescription": "8/side",
          "cue": "Sit tall, rotate hip capsules smoothly without hands."
        },
        {
          "exerciseId": "worlds_greatest_stretch",
          "prescription": "5/side",
          "cue": "Lunge deep, drop elbow to instep, open wide to sky."
        },
        {
          "exerciseId": "cossack_squat",
          "prescription": "6/side",
          "cue": "Sit deep into one hip, trailing heel down with toes up."
        },
        {
          "exerciseId": "deep_squat_hold",
          "prescription": "45s × 2",
          "cue": "Pry knees open with elbows, shift weight ankle to ankle."
        }
      ]
    },
    "evening": {
      "label": "Full-Body Day 5 — Functional Explosiveness & Metabolic Shred",
      "subtitle": "Full-body dumbbell supersets and athletic power conditioning",
      "finisher": "Finisher: 3 rounds — 15 Lateral Raises + 15 Weighted Glute Bridges",
      "groups": [
        {
          "name": "Superset A (Full-Body Power)",
          "restNote": "Do in pairs, 60–75s rest after each pair (4 rounds)",
          "exercises": [
            {
              "exerciseId": "db_thrusters",
              "prescription": "4 × 8"
            },
            {
              "exerciseId": "gorilla_rows",
              "prescription": "4 × 10"
            }
          ]
        },
        {
          "name": "Superset B (Chest & Lunges)",
          "restNote": "Do in pairs, 60–75s rest after each pair (3 rounds)",
          "exercises": [
            {
              "exerciseId": "floor_press",
              "prescription": "3 × 10"
            },
            {
              "exerciseId": "reverse_lunges",
              "prescription": "3 × 10/side"
            }
          ]
        },
        {
          "name": "Athletic Iron Complex",
          "restNote": "60s rest between sets (3 rounds)",
          "exercises": [
            {
              "exerciseId": "man_makers",
              "prescription": "3 × 6"
            }
          ]
        }
      ]
    }
  },
  "Sat": {
    "dayKey": "Sat",
    "fullName": "Saturday",
    "morning": {
      "skipping": {
        "title": "Skipping — Speed & Agility Complex",
        "duration": "8 × (30s crossover sprint / 30s rest)",
        "cue": "High cadence, turn rope from wrists, light on feet."
      },
      "abs": [
        {
          "exerciseId": "hollow_body_hold",
          "prescription": "3 × 35s"
        },
        {
          "exerciseId": "glute_bridge_hold",
          "prescription": "3 × 45s"
        }
      ],
      "pelvic": [
        {
          "exerciseId": "diaphragmatic_breathing",
          "prescription": "1 min",
          "cue": "Exhale fully, vacuum navel to spine, hold 10s."
        },
        {
          "exerciseId": "slow_kegels",
          "prescription": "10 reps (5s hold / 5s rest)",
          "cue": "Elevator lift, hold 5s with maximum force, full 5s release."
        },
        {
          "exerciseId": "quick_flicks",
          "prescription": "15 quick snaps",
          "cue": "Fast 1s snap squeeze, immediate release, build fast-twitch control."
        },
        {
          "exerciseId": "deep_squat_breathing",
          "prescription": "1 min deep reset",
          "cue": "Deep ATG squat, breathe air into pelvic bowl, expand & decompress."
        }
      ],
      "mobility": [
        {
          "exerciseId": "hip_switches_9090",
          "prescription": "8/side",
          "cue": "Sit tall, rotate hip capsules smoothly without hands."
        },
        {
          "exerciseId": "worlds_greatest_stretch",
          "prescription": "5/side",
          "cue": "Lunge deep, drop elbow to instep, open wide to sky."
        },
        {
          "exerciseId": "cossack_squat",
          "prescription": "6/side",
          "cue": "Sit deep into one hip, trailing heel down with toes up."
        },
        {
          "exerciseId": "deep_squat_hold",
          "prescription": "45s × 2",
          "cue": "Pry knees open with elbows, shift weight ankle to ankle."
        }
      ]
    },
    "evening": {
      "label": "Full-Body Day 6 — The Warrior Circuit (High-Output Full-Body Conditioning)",
      "subtitle": "Full-body dumbbell supersets and athletic power conditioning",
      "finisher": "Finisher: 5 min AMRAP — 10 Devil Presses or 50 Fast Skips",
      "groups": [
        {
          "name": "Warrior Circuit (Perform in sequence with 45–60s rest between rounds, 3–4 rounds total)",
          "restNote": "45–60s rest after complete round",
          "exercises": [
            {
              "exerciseId": "goblet_squat",
              "prescription": "10 reps"
            },
            {
              "exerciseId": "renegade_rows",
              "prescription": "6 reps/side"
            },
            {
              "exerciseId": "single_leg_rdl",
              "prescription": "8 reps/side"
            },
            {
              "exerciseId": "arnold_press",
              "prescription": "10 reps"
            },
            {
              "exerciseId": "farmers_carry",
              "prescription": "45s march"
            }
          ]
        }
      ]
    }
  },
  "Sun": {
    "dayKey": "Sun",
    "fullName": "Sunday",
    "morning": {
      "skipping": {
        "title": "Skipping — Restorative Boxer Skip",
        "duration": "12 min easy rhythm recovery",
        "cue": "High cadence, turn rope from wrists, light on feet."
      },
      "abs": [
        {
          "exerciseId": "prone_cobra_hold",
          "prescription": "3 × 35s"
        },
        {
          "exerciseId": "bird_dogs",
          "prescription": "3 × 10/side"
        }
      ],
      "pelvic": [
        {
          "exerciseId": "diaphragmatic_breathing",
          "prescription": "1 min",
          "cue": "Exhale fully, vacuum navel to spine, hold 10s."
        },
        {
          "exerciseId": "slow_kegels",
          "prescription": "10 reps (5s hold / 5s rest)",
          "cue": "Elevator lift, hold 5s with maximum force, full 5s release."
        },
        {
          "exerciseId": "quick_flicks",
          "prescription": "15 quick snaps",
          "cue": "Fast 1s snap squeeze, immediate release, build fast-twitch control."
        },
        {
          "exerciseId": "deep_squat_breathing",
          "prescription": "1 min deep reset",
          "cue": "Deep ATG squat, breathe air into pelvic bowl, expand & decompress."
        }
      ],
      "mobility": [
        {
          "exerciseId": "hip_switches_9090",
          "prescription": "8/side",
          "cue": "Sit tall, rotate hip capsules smoothly without hands."
        },
        {
          "exerciseId": "worlds_greatest_stretch",
          "prescription": "5/side",
          "cue": "Lunge deep, drop elbow to instep, open wide to sky."
        },
        {
          "exerciseId": "cossack_squat",
          "prescription": "6/side",
          "cue": "Sit deep into one hip, trailing heel down with toes up."
        },
        {
          "exerciseId": "deep_squat_hold",
          "prescription": "45s × 2",
          "cue": "Pry knees open with elbows, shift weight ankle to ankle."
        }
      ]
    },
    "evening": {
      "label": "Rest & Deep Structural Restoration",
      "subtitle": "Active recovery, parasympathetic reset, fascia release & tissue renewal",
      "note": "No heavy weights today. 15–20 minutes of easy skipping or a walk, followed by the deep hip mobility cooldown below.",
      "groups": []
    }
  }
};
