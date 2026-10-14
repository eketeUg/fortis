/**
 * Fortis Fit - Client Exercise Data & Schedules
 */

window.FORTIS_DATA = {
  EXERCISES: {
    skipping: {
      id: 'skipping',
      name: 'Jump Rope / Skipping',
      targetMuscles: ['Calves', 'Cardio / Full Body', 'Shoulders'],
      equipment: 'Jump Rope',
      cue: 'Light on the balls of your feet, elbows tight to your ribs, flick from wrists.',
      instructions: [
        'Maintain an upright posture with shoulders down and relaxed.',
        'Keep your elbows pinned close to your torso and turn the rope primarily with your wrists.',
        'Bounce lightly on the balls of your feet, jumping only 1-2 inches off the floor.',
        'Keep your knees soft to absorb impact smoothly on every landing.'
      ],
      mistakes: [
        'Swinging arms from the shoulders instead of rotating from the wrists.',
        'Jumping too high or bending knees excessively backwards.',
        'Landing heavily on flat feet or heels.'
      ],
      illustrationType: 'skipping',
      category: 'cardio'
    },
    dead_bugs: {
      id: 'dead_bugs',
      name: 'Dead Bugs',
      targetMuscles: ['Core'],
      equipment: 'Mat / Floor',
      cue: 'Lower back glued to the floor, move slowly and deliberately.',
      instructions: [
        'Lie flat on your back with arms reaching toward the ceiling and knees bent at 90 degrees directly over hips.',
        'Brace your core so your entire lower back presses firmly against the floor with zero gap.',
        'Slowly extend your right arm overhead and left leg straight out until hovering just above the floor.',
        'Pause for 1 second, then return to start under control and switch to the opposite side.'
      ],
      mistakes: [
        'Allowing lower back to arch off the floor as limbs extend.',
        'Rushing through the movement without maintaining core tension.',
        'Letting the stationary knee drift towards the chest.'
      ],
      illustrationType: 'dead_bugs',
      category: 'abs'
    },
    reverse_crunches: {
      id: 'reverse_crunches',
      name: 'Reverse Crunches',
      targetMuscles: ['Core'],
      equipment: 'Mat / Floor',
      cue: 'Curl your pelvis up toward your ribs — no leg swinging.',
      instructions: [
        'Lie on your back with hands beside your hips and knees bent at 90 degrees.',
        'Draw your abdominal wall inward to initiate the lift from your lower abs.',
        'Roll your pelvis backward, curling your hips 2–4 inches off the floor toward your chest.',
        'Hold the peak contraction for a split second, then lower slowly without letting your feet slam.'
      ],
      mistakes: [
        'Kicking or using momentum from your legs to toss hips upward.',
        'Pressing down violently into the floor with hands and shoulders.',
        'Dropping down quickly on the eccentric lowering phase.'
      ],
      illustrationType: 'reverse_crunches',
      category: 'abs'
    },
    side_plank: {
      id: 'side_plank',
      name: 'Side Plank',
      targetMuscles: ['Obliques', 'Core', 'Shoulders'],
      equipment: 'Mat / Floor',
      cue: 'Stack hips, one straight line from ear to ankle, drive bottom hip high.',
      instructions: [
        'Lie on your side with your elbow directly underneath your shoulder and forearm perpendicular.',
        'Stack your feet or stagger them heel-to-toe for added stability.',
        'Engage your obliques and lift your hips until your body forms a straight diagonal line.',
        'Keep head neutral, chest open, and breathe steadily throughout the hold.'
      ],
      mistakes: [
        'Sagging the lower hip toward the floor.',
        'Rotating top shoulder forward toward the ground.',
        'Placing the elbow too far forward or backward from shoulder.'
      ],
      illustrationType: 'side_plank',
      category: 'abs'
    },
    pallof_press: {
      id: 'pallof_press',
      name: 'Pallof-style Press',
      targetMuscles: ['Obliques', 'Core'],
      equipment: 'Dumbbells',
      cue: 'Resist rotation, press out slow, maintain tall athletic posture.',
      instructions: [
        'Stand with feet shoulder-width apart, knees soft, holding a dumbbell vertically with both hands at your chest.',
        'Brace your abdominal wall and glutes firmly.',
        'Press the weight straight out in front of your chest until arms are extended.',
        'Hold for 2 seconds resisting any rotation, then slowly pull the weight back to sternum.'
      ],
      mistakes: [
        'Leaning or twisting torso during the press.',
        'Shrugging shoulders up toward ears.',
        'Rushing the extension and pause.'
      ],
      illustrationType: 'pallof_press',
      category: 'abs'
    },
    plank_to_pushup: {
      id: 'plank_to_pushup',
      name: 'Plank to Push-up',
      targetMuscles: ['Core', 'Triceps', 'Shoulders', 'Chest'],
      equipment: 'Mat / Floor',
      cue: 'Keep hips still like a table, alternate your lead arm each rep.',
      instructions: [
        'Start in a forearm plank with elbows under shoulders, core braced, feet slightly wider than hip-width.',
        'Plant your right hand on the floor exactly where your right elbow was, pressing up.',
        'Immediately plant your left hand and push up into a full high plank position.',
        'Lower your right elbow back to the floor, followed by your left, returning to forearm plank. Alternate lead hand next rep.'
      ],
      mistakes: [
        'Rocking hips wildly from side to side during the climb.',
        'Placing hands too far in front of shoulders.',
        'Letting the lower back dip into hyperextension.'
      ],
      illustrationType: 'plank_to_pushup',
      category: 'abs'
    },
    lying_leg_raises: {
      id: 'lying_leg_raises',
      name: 'Lying Leg Raises',
      targetMuscles: ['Core'],
      equipment: 'Mat / Floor',
      cue: "Lower slowly, don't let heels touch down, keep lumbar pressed.",
      instructions: [
        'Lie supine on a mat, hands under glutes or at sides, legs together extended straight.',
        'Brace your abs and press your lower back firmly into the floor.',
        'Raise your legs smoothly until perpendicular to the floor (90 degrees at hips).',
        'Lower legs slowly over 3 seconds until heels hover 1-2 inches above the floor before repeating.'
      ],
      mistakes: [
        'Allowing lower back to peel off the floor as legs descend.',
        'Using momentum or bouncing feet off the ground.',
        'Bending knees excessively during the raise.'
      ],
      illustrationType: 'lying_leg_raises',
      category: 'abs'
    },
    suitcase_hold: {
      id: 'suitcase_hold',
      name: 'Suitcase Hold',
      targetMuscles: ['Obliques', 'Core', 'Shoulders'],
      equipment: 'Dumbbells',
      cue: "Stand tall like a flagpole, don't lean toward or away from the load.",
      instructions: [
        'Hold a heavy dumbbell in one hand by your side with arms hanging straight.',
        'Stand with feet hip-width apart, shoulders square, ribs pulled down over hips.',
        'Resist lateral flexion by contracting your opposite obliques and lateral core.',
        'Hold for 30 seconds maintaining perfectly upright symmetry, then switch sides.'
      ],
      mistakes: [
        'Tilting sideways to compensate for the weight.',
        'Elevating the shoulder holding the weight.',
        'Holding your breath during the isometric contraction.'
      ],
      illustrationType: 'suitcase_hold',
      category: 'abs'
    },
    bird_dogs: {
      id: 'bird_dogs',
      name: 'Bird Dogs',
      targetMuscles: ['Core', 'Glutes', 'Back'],
      equipment: 'Mat / Floor',
      cue: 'Reach arm and leg long, keep hips level with the floor, pause 2s.',
      instructions: [
        'Begin on all fours with hands under shoulders and knees directly under hips.',
        'Engage your deep core so your spine remains neutral and flat.',
        'Simultaneously reach your right arm straight forward and left leg straight back.',
        'Focus on reaching long rather than high. Squeeze glute and hold 2 seconds, then return smoothly.'
      ],
      mistakes: [
        'Arching lower back or kicking leg too high above hip line.',
        'Rotating the pelvis upward toward the ceiling.',
        'Bending the extended elbow or knee.'
      ],
      illustrationType: 'bird_dogs',
      category: 'abs'
    },

    // Pelvic
    diaphragmatic_breathing: {
      id: 'diaphragmatic_breathing',
      name: 'Diaphragmatic Breathing',
      targetMuscles: ['Pelvic Floor', 'Core'],
      equipment: 'Mat / Floor',
      cue: 'Inhale — let the pelvic floor fully relax and drop. Never skip this.',
      instructions: [
        'Lie comfortably on your back with knees bent or sit with a tall, relaxed spine.',
        'Place one hand on your chest and one hand on your belly.',
        'Inhale deeply through your nose, expanding your ribcage 360 degrees and feeling pelvic floor lengthen and relax.',
        'Exhale gently through mouth, noticing the gentle natural rebound of your pelvic floor and abs.'
      ],
      mistakes: [
        'Shallow chest breathing where shoulders elevate.',
        'Clenching pelvic floor or glutes on the inhale.',
        'Forcing air out aggressively instead of gentle relaxation.'
      ],
      illustrationType: 'diaphragmatic_breathing',
      category: 'pelvic'
    },
    slow_kegels: {
      id: 'slow_kegels',
      name: 'Slow Kegels',
      targetMuscles: ['Pelvic Floor'],
      equipment: 'Mat / Floor',
      cue: 'Squeeze and lift pelvic floor, hold 5s, release fully and slowly.',
      instructions: [
        'Inhale to prepare and relax completely.',
        'As you exhale, imagine drawing your sit-bones together and lifting your pelvic floor upward.',
        'Hold the contraction firmly for 5 seconds without holding your breath or clenching glutes.',
        'Release slowly over 5 seconds, ensuring complete relaxation before starting the next rep.'
      ],
      mistakes: [
        'Squeezing glutes, inner thighs, or holding your breath.',
        'Skipping the relaxation phase between contractions.',
        'Pushing downward instead of lifting upward.'
      ],
      illustrationType: 'slow_kegels',
      category: 'pelvic'
    },
    quick_flicks: {
      id: 'quick_flicks',
      name: 'Quick Flicks',
      targetMuscles: ['Pelvic Floor'],
      equipment: 'Mat / Floor',
      cue: 'Fast squeeze — full release each time.',
      instructions: [
        'Assume a comfortable seated or lying posture.',
        'Contract your pelvic floor quickly with high power for 1 second.',
        'Immediately release 100% back to baseline.',
        'Repeat in a brisk, rhythmic cadence for 10 reps.'
      ],
      mistakes: [
        'Failing to let the muscle relax completely between flicks.',
        'Tensing shoulders or neck.',
        'Holding breath.'
      ],
      illustrationType: 'quick_flicks',
      category: 'pelvic'
    },
    deep_squat_breathing: {
      id: 'deep_squat_breathing',
      name: 'Deep Squat Breathing',
      targetMuscles: ['Pelvic Floor', 'Hip Mobility'],
      equipment: 'Bodyweight',
      cue: 'Sit in a deep squat or happy baby, breathe deeply into your belly.',
      instructions: [
        'Drop down into a deep resting squat (or lie in happy baby pose if mobility is restricted).',
        'Keep heels on floor or elevated on a wedge if needed, with chest up.',
        'Use elbows to gently press knees outward.',
        'Take slow, deep diaphragmatic breaths, feeling your pelvic floor widen and release tension.'
      ],
      mistakes: [
        'Rounding back excessively or collapsing chest downward.',
        'Tensing hip flexors instead of relaxing into the bottom position.',
        'Lifting heels off the ground without support.'
      ],
      illustrationType: 'deep_squat_breathing',
      category: 'pelvic'
    },

    // Mobility
    hip_switches_9090: {
      id: 'hip_switches_9090',
      name: '90/90 Hip Switches',
      targetMuscles: ['Hip Mobility', 'Glutes'],
      equipment: 'Mat / Floor',
      cue: 'Sit tall, rotate through both hips, avoid hands on floor if possible.',
      instructions: [
        'Sit on the floor with both knees bent at 90-degree angles: lead leg in external rotation, trail leg in internal rotation.',
        'Sit as upright as possible without collapsing through your spine.',
        'Lift both knees and pivot on your heels, smoothly rotating across to the opposite 90/90 orientation.',
        'Pause at end range for 2 seconds feeling the stretch through both hips.'
      ],
      mistakes: [
        'Slouching through the lower back.',
        'Rushing the transition across the center.',
        'Lifting heels off the floor during the switch.'
      ],
      illustrationType: 'hip_switches_9090',
      category: 'mobility'
    },
    worlds_greatest_stretch: {
      id: 'worlds_greatest_stretch',
      name: "World's Greatest Stretch",
      targetMuscles: ['Hip Mobility', 'Hamstrings', 'Back'],
      equipment: 'Bodyweight',
      cue: 'Lunge deep, drop inside elbow toward instep, rotate and open chest to the sky.',
      instructions: [
        'Step forward into a long runner\'s lunge with hands placed on the floor inside your front foot.',
        'Squeeze the back glute to drive hip forward, sinking into the hip flexor stretch.',
        'Drop your inside elbow down toward your front ankle, holding for 2 seconds.',
        'Reach the same arm up toward the ceiling, rotating your thoracic spine and looking up at your hand.'
      ],
      mistakes: [
        'Letting front heel lift off the ground.',
        'Sagging through the back leg without active glute engagement.',
        'Forcing rotation from the lumbar spine instead of mid-back.'
      ],
      illustrationType: 'worlds_greatest_stretch',
      category: 'mobility'
    },
    leg_swings: {
      id: 'leg_swings',
      name: 'Leg Swings',
      targetMuscles: ['Hip Mobility', 'Hamstrings'],
      equipment: 'Bodyweight',
      cue: 'Hold a wall for balance, swing smoothly from the hip socket.',
      instructions: [
        'Stand beside a wall or sturdy support, holding it lightly for balance.',
        'Swing your outside leg forward and backward in a smooth pendulum arc.',
        'Keep torso upright and avoid hyperextending lower back on the backswing.',
        'Perform forward/backward swings, then turn facing the wall for lateral side-to-side swings.'
      ],
      mistakes: [
        'Arching lower back excessively on the backward swing.',
        'Bending the torso forward and backward with the swing.',
        'Forcing range of motion beyond natural comfortable hip mobility.'
      ],
      illustrationType: 'leg_swings',
      category: 'mobility'
    },
    deep_squat_hold: {
      id: 'deep_squat_hold',
      name: 'Deep Squat Hold',
      targetMuscles: ['Hip Mobility', 'Quads', 'Calves'],
      equipment: 'Bodyweight',
      cue: 'Heels flat down, knees pushed outward, breathe into your belly.',
      instructions: [
        'Stand with feet shoulder-width apart, toes turned slightly out ~15-30 degrees.',
        'Descend all the way down into your lowest comfortable squat position.',
        'Bring palms together at heart center and press elbows gently against inner knees.',
        'Keep chest elevated and spine tall while holding isometric depth.'
      ],
      mistakes: [
        'Heels lifting off the ground (elevate heels slightly if tight).',
        'Knees collapsing inward.',
        'Rounding the upper back completely.'
      ],
      illustrationType: 'deep_squat_hold',
      category: 'mobility'
    },

    // Strength
    goblet_squat: {
      id: 'goblet_squat',
      name: 'Goblet Squat',
      targetMuscles: ['Quads', 'Glutes', 'Core'],
      equipment: 'Dumbbells',
      cue: 'Elbows inside knees at the bottom, chest tall, drive through your whole foot.',
      instructions: [
        'Hold a dumbbell vertically against your sternum with both hands cupping the top head.',
        'Stand with feet slightly wider than shoulder-width, toes turned slightly out.',
        'Hinge at hips and bend knees simultaneously, sitting down between your thighs.',
        'Descend until thighs are parallel or below, touching elbows to the inside of your knees.',
        'Drive evenly through midfoot and heels to stand back up, locking out glutes at the top.'
      ],
      mistakes: [
        'Letting the dumbbell pull your upper back and chest into a slump.',
        'Knees caving inward (valgus collapse) on the ascent.',
        'Shifting weight onto toes and letting heels lift.'
      ],
      illustrationType: 'goblet_squat',
      category: 'strength'
    },
    floor_press: {
      id: 'floor_press',
      name: 'Floor Press',
      targetMuscles: ['Chest', 'Triceps', 'Shoulders'],
      equipment: 'Dumbbells',
      cue: 'Pause briefly on the floor each rep — no bouncing elbows off the ground.',
      instructions: [
        'Lie on the floor with knees bent and feet flat, dumbbells held over your chest with arms extended.',
        'Tuck shoulder blades back and down into the floor to stabilize your shoulder girdle.',
        'Lower the dumbbells with elbows angled ~45 degrees from your torso until your triceps gently touch the ground.',
        'Pause for a dead stop (1 second) to eliminate stretch reflex, then press powerfully back to top.'
      ],
      mistakes: [
        'Bouncing triceps or elbows aggressively off the floor.',
        'Flaring elbows out at 90 degrees, straining the rotator cuffs.',
        'Lifting hips or overarching the lower back.'
      ],
      illustrationType: 'floor_press',
      category: 'strength'
    },
    bent_over_row: {
      id: 'bent_over_row',
      name: 'Bent-Over Row',
      targetMuscles: ['Back', 'Lats', 'Biceps'],
      equipment: 'Dumbbells',
      cue: 'Flat back, pull the dumbbell to your hip pocket, squeeze shoulder blades.',
      instructions: [
        'Hold dumbbells with a neutral or overhand grip, feet hip-width apart.',
        'Push your hips back into a 45-to-60 degree torso hinge while maintaining a flat, neutral spine.',
        'Pull the dumbbells up toward your hip pockets by driving your elbows back.',
        'Squeeze your lats and rhomboids at peak contraction for 1 second, then lower under control.'
      ],
      mistakes: [
        'Rounding the spine or jerking torso upright to heave the weight.',
        'Pulling dumbbells straight up to shoulders rather than back toward hips.',
        'Using body momentum instead of controlled back contraction.'
      ],
      illustrationType: 'bent_over_row',
      category: 'strength'
    },
    lateral_raise: {
      id: 'lateral_raise',
      name: 'Lateral Raise',
      targetMuscles: ['Shoulders'],
      equipment: 'Dumbbells',
      cue: 'Slight bend in elbows, lead with pinkies/elbows, zero torso swing.',
      instructions: [
        'Stand tall with dumbbells hanging at your sides or slightly in front of thighs.',
        'Maintain a slight bend in your elbows and a subtle forward torso tilt (~10 degrees).',
        'Raise the dumbbells outward in the scapular plane until upper arms are parallel to the floor.',
        'Pour out the pitcher slightly (lead with elbows), pause at shoulder height, and lower slowly.'
      ],
      mistakes: [
        'Shrugging traps up to neck to assist the lift.',
        'Swinging hips or using leg drive to throw weights up.',
        'Lifting higher than shoulder level, pinching the acromion.'
      ],
      illustrationType: 'lateral_raise',
      category: 'strength'
    },
    romanian_deadlift: {
      id: 'romanian_deadlift',
      name: 'Romanian Deadlift (RDL)',
      targetMuscles: ['Hamstrings', 'Glutes', 'Back'],
      equipment: 'Dumbbells',
      cue: 'Hips back to the wall, soft knees, dumbbells skim your shins.',
      instructions: [
        'Stand tall holding dumbbells in front of thighs with shoulders set back and core braced.',
        'With soft, unlocked knees, push your hips straight back as if touching a wall behind you.',
        'Slide the dumbbells close along your thighs and shins until you feel a deep stretch in your hamstrings.',
        'Keep back flat and neutral. Drive hips forward and squeeze glutes to return to standing.'
      ],
      mistakes: [
        'Bending knees like a squat instead of hinging back at the hips.',
        'Letting the dumbbells drift far away from legs, overloading the lower back.',
        'Rounding lower spine at the bottom of the stretch.'
      ],
      illustrationType: 'romanian_deadlift',
      category: 'strength'
    },
    hammer_curls: {
      id: 'hammer_curls',
      name: 'Hammer Curls',
      targetMuscles: ['Biceps', 'Shoulders'],
      equipment: 'Dumbbells',
      cue: 'Elbows pinned to your sides, palms facing each other, no body swing.',
      instructions: [
        'Stand tall holding dumbbells at your sides with neutral grip (palms facing inward).',
        'Pin your elbows firmly against your ribcage.',
        'Curl the dumbbells up toward your front shoulders while maintaining neutral wrist alignment.',
        'Squeeze the brachialis and biceps at the top, then lower smoothly over 2-3 seconds.'
      ],
      mistakes: [
        'Swinging torso or thrusting hips to gain momentum.',
        'Allowing elbows to drift forward or flare out during the curl.',
        'Letting the weights drop quickly on the negative.'
      ],
      illustrationType: 'hammer_curls',
      category: 'strength'
    },
    close_grip_press: {
      id: 'close_grip_press',
      name: 'Close-Grip Press',
      targetMuscles: ['Triceps', 'Chest', 'Shoulders'],
      equipment: 'Dumbbells',
      cue: 'Palms facing each other, dumbbells touching or close, elbows tucked ~45 degrees.',
      instructions: [
        'Lie on the floor or bench holding dumbbells over chest with a neutral grip (palms facing each other).',
        'Keep dumbbells pressed together or a few inches apart.',
        'Lower the dumbbells toward your lower chest / upper sternum, tucking elbows tight along ribcage.',
        'Press up powerfully, squeezing triceps and inner chest at full lockout.'
      ],
      mistakes: [
        'Flaring elbows outward, shifting emphasis away from triceps.',
        'Lowering the weight onto the face or throat instead of lower chest.',
        'Losing control and letting dumbbells separate erratically.'
      ],
      illustrationType: 'close_grip_press',
      category: 'strength'
    },
    gorilla_rows: {
      id: 'gorilla_rows',
      name: 'Gorilla Rows',
      targetMuscles: ['Back', 'Lats', 'Core', 'Hamstrings'],
      equipment: 'Dumbbells',
      cue: 'Wide athletic stance, flat back, row to hip, alternate sides without twisting.',
      instructions: [
        'Stand with feet wide outside shoulder-width, dumbbells on the floor between your feet.',
        'Hinge deeply at the hips into a gorilla stance with a flat back and chest proudly lifted.',
        'One dumbbell rests on the floor providing a stable push-point as you row the opposite dumbbell to your hip.',
        'Lower the weight back to the floor with control and immediately row the opposite side.'
      ],
      mistakes: [
        'Rounding the lower back in the hinged stance.',
        'Twisting the shoulders or hips excessively during the pull.',
        'Standing too upright and losing lat engagement.'
      ],
      illustrationType: 'gorilla_rows',
      category: 'strength'
    },
    arnold_press: {
      id: 'arnold_press',
      name: 'Arnold Press',
      targetMuscles: ['Shoulders', 'Triceps'],
      equipment: 'Dumbbells',
      cue: 'Rotate palms as you press, brace your core, smooth continuous motion.',
      instructions: [
        'Hold dumbbells at shoulder height with palms facing your face (contracted curl position).',
        'As you press upward, rotate your hands outward smoothly so your palms face forward at lockout overhead.',
        'Pause overhead with biceps aligned with ears.',
        'Reverse the rotational path precisely on the descent back to starting chin-level position.'
      ],
      mistakes: [
        'Arching lower back to push heavy weights overhead.',
        'Separating the rotation and the press into two jerky, disjointed movements.',
        'Letting elbows flare out wildly.'
      ],
      illustrationType: 'arnold_press',
      category: 'strength'
    },
    bulgarian_split_squat: {
      id: 'bulgarian_split_squat',
      name: 'Bulgarian Split Squat',
      targetMuscles: ['Quads', 'Glutes'],
      equipment: 'Chair / Bench',
      cue: 'Rear foot laces on a chair/bench, knee tracks over toes, sink straight down.',
      instructions: [
        'Stand 2-3 feet in front of a sturdy chair or bench and place top of rear foot flat on the surface.',
        'Hold dumbbells at your sides or use bodyweight for stability.',
        'Descend by bending both knees, dropping back knee toward the floor while torso tilts slightly forward.',
        'Sink until front thigh is parallel to the ground, then drive through front heel to stand up.'
      ],
      mistakes: [
        'Front foot placed too close to bench, causing heel to peel off the floor.',
        'Pushing weight off the rear toe instead of loading front working leg.',
        'Front knee caving inward during descent.'
      ],
      illustrationType: 'bulgarian_split_squat',
      category: 'strength'
    },
    upright_row: {
      id: 'upright_row',
      name: 'Upright Row',
      targetMuscles: ['Shoulders', 'Back'],
      equipment: 'Dumbbells',
      cue: 'Lead with elbows, keep dumbbells close to body, stop at mid-chest height.',
      instructions: [
        'Stand with feet shoulder-width apart holding dumbbells in front of thighs with palms facing you.',
        'Pull the dumbbells upward along the line of your body, leading with high elbows.',
        'Stop when dumbbells reach mid-chest level and elbows are at shoulder height.',
        'Pause for 1 second, then lower under complete control.'
      ],
      mistakes: [
        'Pulling too high (above shoulders), causing shoulder impingement.',
        'Allowing wrists to lead the pull instead of high elbows.',
        'Leaning backward to cheat the weight up.'
      ],
      illustrationType: 'upright_row',
      category: 'strength'
    },
    renegade_rows: {
      id: 'renegade_rows',
      name: 'Renegade Rows',
      targetMuscles: ['Core', 'Back', 'Chest', 'Shoulders'],
      equipment: 'Dumbbells',
      cue: 'Feet wide for base, hips level like water glass on your back — row without rotating.',
      instructions: [
        'Set up in a high push-up plank gripping hex dumbbells directly under shoulders.',
        'Widen feet slightly wider than shoulder-width to create a stable anti-rotation base.',
        'Brace core and glutes tightly. Row one dumbbell up to your hip pocket while stabilizing through the other arm.',
        'Return dumbbell smoothly to the floor and repeat with the other arm without letting hips twist.'
      ],
      mistakes: [
        'Twisting hips or shifting weight aggressively to the side.',
        'Sagging lower back or piking hips into the air.',
        'Using circular dumbbells that can roll and cause wrist sprain.'
      ],
      illustrationType: 'renegade_rows',
      category: 'strength'
    },
    mike_tyson_pushups: {
      id: 'mike_tyson_pushups',
      name: 'Mike Tyson Push-ups',
      targetMuscles: ['Shoulders', 'Chest', 'Quads', 'Core'],
      equipment: 'Mat / Floor',
      cue: 'Crouch back like a loaded spring, explode forward into push-up, land soft.',
      instructions: [
        'Start in a standard push-up position with feet pushed against a sturdy wall or wide on the floor.',
        'Bend your knees and push hips back toward heels in a loaded beast / deep crouch position.',
        'Drive powerfully forward through legs into a low push-up position hovering off the floor.',
        'Press your chest and arms back up, immediately recoiling back into the crouch.'
      ],
      mistakes: [
        'Slapping chest on the floor.',
        'Losing abdominal brace and hyperextending lumbar spine during forward surge.',
        'Rushing the movement without full range of motion.'
      ],
      illustrationType: 'mike_tyson_pushups',
      category: 'strength'
    },
    single_leg_rdl: {
      id: 'single_leg_rdl',
      name: 'Single-Leg RDL',
      targetMuscles: ['Hamstrings', 'Glutes', 'Core'],
      equipment: 'Dumbbells',
      cue: 'Soft standing knee, hinge back toward wall behind you, keep hips square.',
      instructions: [
        'Stand on one leg with a soft, unlocked knee, holding a dumbbell in the opposite hand.',
        'Hinge forward from the hip while extending your free leg straight back in line with your spine.',
        'Lower the dumbbell toward your standing shin until you feel tension in your working hamstring.',
        'Keep hips square to the floor (don\'t open up pelvis). Squeeze glute to stand tall.'
      ],
      mistakes: [
        'Rotating the pelvis open toward the ceiling.',
        'Rounding upper back or dropping the weight far from leg.',
        'Locking out standing knee completely.'
      ],
      illustrationType: 'single_leg_rdl',
      category: 'strength'
    },
    glute_bridge: {
      id: 'glute_bridge',
      name: 'Glute Bridge',
      targetMuscles: ['Glutes', 'Hamstrings', 'Core'],
      equipment: 'Mat / Floor',
      cue: 'Ribs down, drive through heels, squeeze glutes hard for 2s at the top.',
      instructions: [
        'Lie flat on your back with knees bent and feet flat on the floor, hip-width apart.',
        'Tuck pelvis into posterior tilt, locking ribs down over pelvis.',
        'Drive through your heels to bridge your hips upward until thighs and torso align.',
        'Hold and squeeze glutes aggressively for 2 seconds at the peak, then lower slowly.'
      ],
      mistakes: [
        'Overextending the lower back at the top instead of squeezing glutes.',
        'Pushing through the toes instead of the heels.',
        'Letting knees splay out or cave in.'
      ],
      illustrationType: 'glute_bridge',
      category: 'strength'
    },
    rear_delt_fly: {
      id: 'rear_delt_fly',
      name: 'Rear Delt Fly',
      targetMuscles: ['Shoulders', 'Back'],
      equipment: 'Dumbbells',
      cue: 'Bent over deep, slight elbow bend, lead with rear shoulders.',
      instructions: [
        'Stand with feet hip-width, hinge at hips until torso is nearly parallel to the floor.',
        'Hold light dumbbells hanging under chest with palms facing each other.',
        'With a fixed soft bend in elbows, raise arms out to the sides in a wide arc.',
        'Squeeze the back of your shoulders at the top for 1 second, then lower under control.'
      ],
      mistakes: [
        'Using heavy weights and swinging the torso.',
        'Leading with hands instead of elbows.',
        'Shrugging traps and neck.'
      ],
      illustrationType: 'rear_delt_fly',
      category: 'strength'
    },
    jump_squats: {
      id: 'jump_squats',
      name: 'Jump Squats',
      targetMuscles: ['Quads', 'Glutes', 'Calves', 'Cardio / Full Body'],
      equipment: 'Bodyweight',
      cue: 'Explode up, land soft toe-to-heel, absorb into next squat.',
      instructions: [
        'Stand with feet shoulder-width apart, descend into a quarter or half squat.',
        'Swing arms and explode upward through your hips, knees, and ankles.',
        'Reach peak jump height and land quietly on balls of feet, decelerating smoothly into the next squat.'
      ],
      mistakes: [
        'Landing stiff-legged with a heavy thump.',
        'Letting knees cave inward upon landing.',
        'Losing balance backwards.'
      ],
      illustrationType: 'jump_squats',
      category: 'cardio'
    }
  },

  DAYS: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  FULL_DAYS: {
    Mon: 'Monday',
    Tue: 'Tuesday',
    Wed: 'Wednesday',
    Thu: 'Thursday',
    Fri: 'Friday',
    Sat: 'Saturday',
    Sun: 'Sunday'
  },

  SKIPPING: {
    Mon: ['Hard intervals', '10 × (45s fast / 30s easy)'],
    Tue: ['Steady pace', '15 min, conversational speed'],
    Wed: ['Sprint intervals', '8 × (30s sprint / 45s rest)'],
    Thu: ['Hard intervals', '10 × (45s fast / 30s easy)'],
    Fri: ['Steady pace', '15 min, conversational speed'],
    Sat: ['Sprint intervals', '8 × (30s sprint / 45s rest)'],
    Sun: ['Light recovery', '10 min easy + extra mobility']
  },

  ABS: {
    Mon: [
      { id: 'dead_bugs', name: 'Dead bugs', reps: '3 × 10/side' },
      { id: 'reverse_crunches', name: 'Reverse crunches', reps: '3 × 12' }
    ],
    Tue: [
      { id: 'side_plank', name: 'Side plank', reps: '3 × 30s/side' },
      { id: 'pallof_press', name: 'Pallof-style press', reps: '3 × 10' }
    ],
    Wed: [
      { id: 'plank_to_pushup', name: 'Plank to push-up', reps: '3 × 10' },
      { id: 'lying_leg_raises', name: 'Lying leg raises', reps: '3 × 12' }
    ],
    Thu: [
      { id: 'dead_bugs', name: 'Dead bugs', reps: '3 × 10/side' },
      { id: 'reverse_crunches', name: 'Reverse crunches', reps: '3 × 12' }
    ],
    Fri: [
      { id: 'side_plank', name: 'Side plank', reps: '3 × 30s/side' },
      { id: 'pallof_press', name: 'Pallof-style press', reps: '3 × 10' }
    ],
    Sat: [
      { id: 'plank_to_pushup', name: 'Plank to push-up', reps: '3 × 10' },
      { id: 'lying_leg_raises', name: 'Lying leg raises', reps: '3 × 12' }
    ],
    Sun: [
      { id: 'suitcase_hold', name: 'Suitcase hold', reps: '3 × 30s/side' },
      { id: 'bird_dogs', name: 'Bird dogs', reps: '3 × 10/side' }
    ]
  },

  PELVIC: [
    { id: 'diaphragmatic_breathing', name: 'Diaphragmatic breathing', reps: '1 min', cue: 'Inhale — let the pelvic floor fully relax and drop. Never skip this.' },
    { id: 'slow_kegels', name: 'Slow kegels', reps: '10 reps', cue: 'Squeeze and lift, hold 5s, release slowly.' },
    { id: 'quick_flicks', name: 'Quick flicks', reps: '10 reps', cue: 'Fast squeeze — full release each time.' },
    { id: 'deep_squat_breathing', name: 'Deep squat breathing', reps: '1 min', cue: 'Sit in a deep squat or happy baby, breathe into your belly.' }
  ],

  MOBILITY: [
    { id: 'hip_switches_9090', name: '90/90 hip switches', reps: '8/side' },
    { id: 'worlds_greatest_stretch', name: "World's greatest stretch", reps: '5/side' },
    { id: 'leg_swings', name: 'Leg swings', reps: '10 each way' },
    { id: 'deep_squat_hold', name: 'Deep squat hold', reps: '30s × 2' }
  ],

  EVENING: {
    Mon: {
      label: 'Day A — Squat & Push',
      groups: [
        {
          tag: 'Superset A',
          rest: 'Do in pairs, 60–75s rest after each pair',
          items: [
            { id: 'goblet_squat', name: 'Goblet squat', reps: '4 × 8' },
            { id: 'floor_press', name: 'Floor press', reps: '4 × 8' }
          ]
        },
        {
          tag: 'Superset B',
          rest: 'Do in pairs, 60–75s rest after each pair',
          items: [
            { id: 'bent_over_row', name: 'Bent-over row', reps: '3 × 10' },
            { id: 'lateral_raise', name: 'Lateral raise', reps: '3 × 12' }
          ]
        },
        {
          tag: 'Straight sets',
          rest: '60s rest between sets',
          items: [
            { id: 'romanian_deadlift', name: 'Romanian deadlift', reps: '2 × 12' },
            { id: 'hammer_curls', name: 'Hammer curls', reps: '3 × 10' }
          ]
        }
      ]
    },
    Tue: {
      label: 'Day B — Hinge & Pull',
      groups: [
        {
          tag: 'Superset A',
          rest: 'Do in pairs, 60–75s rest after each pair',
          items: [
            { id: 'romanian_deadlift', name: 'Romanian deadlift', reps: '4 × 8' },
            { id: 'close_grip_press', name: 'Close-grip press', reps: '4 × 8' }
          ]
        },
        {
          tag: 'Superset B',
          rest: 'Do in pairs, 60–75s rest after each pair',
          items: [
            { id: 'gorilla_rows', name: 'Gorilla rows', reps: '3 × 10' },
            { id: 'arnold_press', name: 'Arnold press', reps: '3 × 10' }
          ]
        },
        {
          tag: 'Straight sets',
          rest: '60s rest between sets',
          items: [
            { id: 'bulgarian_split_squat', name: 'Bulgarian split squat', reps: '3 × 8/side' },
            { id: 'upright_row', name: 'Upright row', reps: '3 × 12' }
          ]
        }
      ]
    },
    Wed: {
      label: 'Day C — Unilateral & Athletic',
      finisher: 'Finisher: 5 min EMOM — 10 jump squats or 20 fast skips.',
      groups: [
        {
          tag: 'Circuit',
          rest: 'Perform as a circuit with 45–60s rest between rounds (3 rounds)',
          items: [
            { id: 'renegade_rows', name: 'Renegade rows', reps: '3 × 8/side' },
            { id: 'mike_tyson_pushups', name: 'Mike Tyson push-ups', reps: '3 × 8' },
            { id: 'single_leg_rdl', name: 'Single-leg RDL', reps: '3 × 8/side' },
            { id: 'glute_bridge', name: 'Glute bridge', reps: '3 × 12' },
            { id: 'rear_delt_fly', name: 'Rear delt fly', reps: '3 × 12' }
          ]
        }
      ]
    },
    Thu: {
      label: 'Day A — Squat & Push',
      groups: [
        {
          tag: 'Superset A',
          rest: 'Do in pairs, 60–75s rest after each pair',
          items: [
            { id: 'goblet_squat', name: 'Goblet squat', reps: '4 × 8' },
            { id: 'floor_press', name: 'Floor press', reps: '4 × 8' }
          ]
        },
        {
          tag: 'Superset B',
          rest: 'Do in pairs, 60–75s rest after each pair',
          items: [
            { id: 'bent_over_row', name: 'Bent-over row', reps: '3 × 10' },
            { id: 'lateral_raise', name: 'Lateral raise', reps: '3 × 12' }
          ]
        },
        {
          tag: 'Straight sets',
          rest: '60s rest between sets',
          items: [
            { id: 'romanian_deadlift', name: 'Romanian deadlift', reps: '2 × 12' },
            { id: 'hammer_curls', name: 'Hammer curls', reps: '3 × 10' }
          ]
        }
      ]
    },
    Fri: {
      label: 'Day B — Hinge & Pull',
      groups: [
        {
          tag: 'Superset A',
          rest: 'Do in pairs, 60–75s rest after each pair',
          items: [
            { id: 'romanian_deadlift', name: 'Romanian deadlift', reps: '4 × 8' },
            { id: 'close_grip_press', name: 'Close-grip press', reps: '4 × 8' }
          ]
        },
        {
          tag: 'Superset B',
          rest: 'Do in pairs, 60–75s rest after each pair',
          items: [
            { id: 'gorilla_rows', name: 'Gorilla rows', reps: '3 × 10' },
            { id: 'arnold_press', name: 'Arnold press', reps: '3 × 10' }
          ]
        },
        {
          tag: 'Straight sets',
          rest: '60s rest between sets',
          items: [
            { id: 'bulgarian_split_squat', name: 'Bulgarian split squat', reps: '3 × 8/side' },
            { id: 'upright_row', name: 'Upright row', reps: '3 × 12' }
          ]
        }
      ]
    },
    Sat: {
      label: 'Day C — Unilateral & Athletic',
      finisher: 'Finisher: 5 min EMOM — 10 jump squats or 20 fast skips.',
      groups: [
        {
          tag: 'Circuit',
          rest: 'Perform as a circuit with 45–60s rest between rounds (3 rounds)',
          items: [
            { id: 'renegade_rows', name: 'Renegade rows', reps: '3 × 8/side' },
            { id: 'mike_tyson_pushups', name: 'Mike Tyson push-ups', reps: '3 × 8' },
            { id: 'single_leg_rdl', name: 'Single-leg RDL', reps: '3 × 8/side' },
            { id: 'glute_bridge', name: 'Glute bridge', reps: '3 × 12' },
            { id: 'rear_delt_fly', name: 'Rear delt fly', reps: '3 × 12' }
          ]
        }
      ]
    },
    Sun: {
      label: 'Rest & Recover',
      note: 'No weights today. 20 min easy skipping or a walk, then the mobility flow.',
      groups: []
    }
  }
};

