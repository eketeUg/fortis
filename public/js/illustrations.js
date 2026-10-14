/**
 * Fortis Fit - Exercise Vector Illustrations
 * High-definition, theme-adaptive vector illustrations for every exercise in the guide.
 */

window.EXERCISE_ILLUSTRATIONS = {
  // 1. Skipping / Jump Rope
  skipping: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <defs>
        <linearGradient id="ropeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0a84ff" />
          <stop offset="100%" stop-color="#5ac8fa" />
        </linearGradient>
        <radialGradient id="glowPulse" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#0a84ff" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#0a84ff" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <!-- Shadow & ground -->
      <ellipse cx="120" cy="165" rx="30" ry="5" fill="rgba(0,0,0,0.12)" />
      <!-- Jump Rope Arc -->
      <path d="M 65 95 C 40 135 60 172 120 172 C 180 172 200 135 175 95" fill="none" stroke="url(#ropeGrad)" stroke-width="2.5" stroke-dasharray="4 2" />
      <path d="M 65 95 C 40 50 70 15 120 15 C 170 15 200 50 175 95" fill="none" stroke="url(#ropeGrad)" stroke-width="1.8" opacity="0.35" />
      <!-- Head -->
      <circle cx="120" cy="40" r="11" fill="currentColor" opacity="0.9" />
      <!-- Torso -->
      <path d="M 113 52 L 127 52 L 124 95 L 116 95 Z" fill="currentColor" opacity="0.85" rx="2" />
      <!-- Arms & Forearms holding handles -->
      <path d="M 114 56 L 98 75 L 80 92" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <path d="M 126 56 L 142 75 L 160 92" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <!-- Handles -->
      <rect x="74" y="90" width="8" height="4" rx="2" fill="#0a84ff" transform="rotate(-20 78 92)" />
      <rect x="158" y="90" width="8" height="4" rx="2" fill="#0a84ff" transform="rotate(20 162 92)" />
      <!-- Legs in air (bounce) -->
      <path d="M 117 95 L 115 128 L 117 148" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <path d="M 123 95 L 125 128 L 123 148" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <!-- Active Calves Glow -->
      <ellipse cx="115" cy="136" rx="5" ry="8" fill="#0a84ff" opacity="0.85" />
      <ellipse cx="125" cy="136" rx="5" ry="8" fill="#0a84ff" opacity="0.85" />
      <!-- Feet pointing down -->
      <path d="M 117 148 L 119 157" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <path d="M 123 148 L 125 157" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <!-- Dynamic Motion Lines -->
      <line x1="108" y1="165" x2="108" y2="159" stroke="#0a84ff" stroke-width="2" stroke-linecap="round" />
      <line x1="132" y1="165" x2="132" y2="159" stroke="#0a84ff" stroke-width="2" stroke-linecap="round" />
    </svg>
  `,

  // 2. Goblet Squat
  goblet_squat: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <!-- Ground line -->
      <line x1="40" y1="162" x2="200" y2="162" stroke="currentColor" opacity="0.2" stroke-width="2" stroke-linecap="round" />
      <!-- Head -->
      <circle cx="120" cy="50" r="11" fill="currentColor" opacity="0.9" />
      <!-- Upright Torso -->
      <path d="M 112 62 L 128 62 L 125 102 L 115 102 Z" fill="currentColor" opacity="0.85" />
      <!-- Quads Highlight (active in deep squat) -->
      <path d="M 115 102 L 82 108" stroke="#0a84ff" stroke-width="10" stroke-linecap="round" />
      <path d="M 125 102 L 158 108" stroke="#0a84ff" stroke-width="10" stroke-linecap="round" />
      <!-- Shins down to floor -->
      <path d="M 82 108 L 86 158" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <path d="M 158 108 L 154 158" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <!-- Feet flat -->
      <path d="M 86 158 L 74 160" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <path d="M 154 158 L 166 160" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <!-- Arms tucked holding dumbbell -->
      <path d="M 113 65 L 102 85 L 114 86" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <path d="M 127 65 L 138 85 L 126 86" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <!-- Vertical Dumbbell at chest -->
      <rect x="116" y="72" width="8" height="22" rx="3" fill="#ff9500" />
      <rect x="113" y="70" width="14" height="5" rx="2" fill="#ff9500" />
      <rect x="113" y="90" width="14" height="5" rx="2" fill="#ff9500" />
      <!-- Glute activation highlight -->
      <circle cx="120" cy="103" r="6" fill="#30d158" opacity="0.9" />
    </svg>
  `,

  // 3. Floor Press
  floor_press: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <!-- Floor line -->
      <line x1="30" y1="145" x2="210" y2="145" stroke="currentColor" opacity="0.25" stroke-width="3" />
      <!-- Body lying flat on floor -->
      <!-- Head on floor -->
      <circle cx="60" cy="134" r="10" fill="currentColor" opacity="0.9" />
      <!-- Torso flat on ground -->
      <path d="M 72 136 L 135 136" stroke="currentColor" stroke-width="12" stroke-linecap="round" />
      <!-- Chest Muscle Highlight -->
      <line x1="88" y1="130" x2="105" y2="130" stroke="#0a84ff" stroke-width="6" stroke-linecap="round" />
      <!-- Bent knees / feet on floor -->
      <path d="M 135 136 L 165 110 L 180 145" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Arms pressing dumbbells up -->
      <path d="M 94 136 L 94 85" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <!-- Triceps & Shoulder glow -->
      <circle cx="94" cy="115" r="4" fill="#0a84ff" />
      <!-- Dumbbell pressed overhead -->
      <rect x="80" y="80" width="28" height="6" rx="2" fill="#ff9500" />
      <rect x="78" y="74" width="8" height="18" rx="2" fill="#ff9500" />
      <rect x="102" y="74" width="8" height="18" rx="2" fill="#ff9500" />
      <!-- Paused on floor indicator -->
      <path d="M 94 80 L 94 65" stroke="#30d158" stroke-width="2" stroke-linecap="round" marker-end="url(#arrow)" />
      <text x="120" y="80" font-size="10" fill="#30d158" font-weight="700">1s PAUSE</text>
    </svg>
  `,

  // 4. Bent-Over Row
  bent_over_row: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <!-- Ground -->
      <line x1="40" y1="162" x2="200" y2="162" stroke="currentColor" opacity="0.2" stroke-width="2" />
      <!-- Feet -->
      <path d="M 100 160 L 88 160" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <!-- Legs hinged -->
      <path d="M 95 160 L 102 125 L 115 95" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <!-- Flat Torso at 45 degree angle -->
      <path d="M 115 95 L 155 70" stroke="currentColor" stroke-width="12" stroke-linecap="round" />
      <!-- Head aligned with spine -->
      <circle cx="166" cy="62" r="10" fill="currentColor" opacity="0.9" />
      <!-- Back / Lats Highlight -->
      <path d="M 120 90 L 148 72" stroke="#0a84ff" stroke-width="5" stroke-linecap="round" />
      <!-- Arm rowing dumbbell to hip -->
      <path d="M 148 74 L 140 88 L 125 88" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <!-- Dumbbell pulled to hip -->
      <rect x="115" y="84" width="20" height="7" rx="2" fill="#ff9500" transform="rotate(-15 125 87)" />
      <!-- Upward pull arrow -->
      <path d="M 136 115 L 136 96" stroke="#30d158" stroke-width="2" stroke-linecap="round" />
      <polygon points="133,98 136,92 139,98" fill="#30d158" />
    </svg>
  `,

  // 5. Lateral Raise
  lateral_raise: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <!-- Ground -->
      <line x1="50" y1="165" x2="190" y2="165" stroke="currentColor" opacity="0.2" stroke-width="2" />
      <!-- Head -->
      <circle cx="120" cy="40" r="11" fill="currentColor" opacity="0.9" />
      <!-- Torso -->
      <path d="M 113 52 L 127 52 L 124 105 L 116 105 Z" fill="currentColor" opacity="0.85" />
      <!-- Legs -->
      <path d="M 117 105 L 113 162" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <path d="M 123 105 L 127 162" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <!-- Lateral Deltoid Highlights -->
      <circle cx="106" cy="56" r="6" fill="#0a84ff" />
      <circle cx="134" cy="56" r="6" fill="#0a84ff" />
      <!-- Arms raised to shoulder height -->
      <path d="M 110 56 L 65 65" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <path d="M 130 56 L 175 65" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <!-- Dumbbells at ends -->
      <rect x="52" y="60" width="14" height="10" rx="2" fill="#ff9500" />
      <rect x="174" y="60" width="14" height="10" rx="2" fill="#ff9500" />
      <!-- Motion arc -->
      <path d="M 90 95 C 75 90 65 80 62 70" fill="none" stroke="#0a84ff" stroke-width="2" stroke-dasharray="3 3" />
      <path d="M 150 95 C 165 90 175 80 178 70" fill="none" stroke="#0a84ff" stroke-width="2" stroke-dasharray="3 3" />
    </svg>
  `,

  // 6. Romanian Deadlift (RDL)
  romanian_deadlift: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <!-- Ground -->
      <line x1="40" y1="165" x2="200" y2="165" stroke="currentColor" opacity="0.2" stroke-width="2" />
      <!-- Feet -->
      <path d="M 125 163 L 140 163" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <!-- Shins vertical with soft knee -->
      <path d="M 128 163 L 125 125" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <!-- Hamstrings / Hips pushed back -->
      <path d="M 125 125 L 100 100" stroke="#0a84ff" stroke-width="8" stroke-linecap="round" />
      <!-- Flat Torso hinged forward -->
      <path d="M 100 100 L 145 78" stroke="currentColor" stroke-width="12" stroke-linecap="round" />
      <!-- Head in neutral line -->
      <circle cx="155" cy="72" r="10" fill="currentColor" opacity="0.9" />
      <!-- Arms hanging down skimming shins -->
      <path d="M 138 83 L 132 125" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <!-- Dumbbells near shins -->
      <rect x="122" y="122" width="20" height="8" rx="2" fill="#ff9500" />
      <!-- Posterior chain tension line -->
      <path d="M 95 102 C 105 120 115 130 120 145" fill="none" stroke="#0a84ff" stroke-width="2" stroke-dasharray="3 2" />
      <!-- Hips back arrow -->
      <path d="M 105 92 L 85 92" stroke="#30d158" stroke-width="2" stroke-linecap="round" />
      <polygon points="87,89 80,92 87,95" fill="#30d158" />
    </svg>
  `,

  // 7. Hammer Curls
  hammer_curls: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <line x1="60" y1="165" x2="180" y2="165" stroke="currentColor" opacity="0.2" stroke-width="2" />
      <!-- Head -->
      <circle cx="120" cy="40" r="11" fill="currentColor" opacity="0.9" />
      <!-- Torso -->
      <path d="M 113 52 L 127 52 L 124 105 L 116 105 Z" fill="currentColor" opacity="0.85" />
      <!-- Legs -->
      <path d="M 117 105 L 115 163" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <path d="M 123 105 L 125 163" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <!-- Upper arm pinned -->
      <path d="M 114 56 L 112 85" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <!-- Forearm curled up (Hammer grip) -->
      <path d="M 112 85 L 102 65" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <!-- Bicep & Brachialis highlight -->
      <circle cx="109" cy="74" r="5" fill="#0a84ff" />
      <!-- Dumbbell held vertically -->
      <rect x="98" y="52" width="8" height="24" rx="2" fill="#ff9500" />
      <rect x="96" y="50" width="12" height="4" rx="1" fill="#ff9500" />
      <rect x="96" y="72" width="12" height="4" rx="1" fill="#ff9500" />
      <!-- Other arm straight at side -->
      <path d="M 126 56 L 128 85 L 129 105" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <rect x="125" y="100" width="8" height="20" rx="2" fill="#ff9500" />
    </svg>
  `,

  // 8. Close-Grip Press
  close_grip_press: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <line x1="30" y1="145" x2="210" y2="145" stroke="currentColor" opacity="0.25" stroke-width="3" />
      <circle cx="60" cy="134" r="10" fill="currentColor" opacity="0.9" />
      <path d="M 72 136 L 135 136" stroke="currentColor" stroke-width="12" stroke-linecap="round" />
      <path d="M 135 136 L 165 110 L 180 145" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Tucked elbows at 45 deg, pressing up -->
      <path d="M 94 136 L 98 100 L 98 80" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <!-- Triceps Glow -->
      <line x1="98" y1="112" x2="98" y2="95" stroke="#0a84ff" stroke-width="5" stroke-linecap="round" />
      <!-- Dumbbells touching together -->
      <rect x="90" y="74" width="8" height="18" rx="2" fill="#ff9500" />
      <rect x="100" y="74" width="8" height="18" rx="2" fill="#ff9500" />
      <text x="125" y="85" font-size="9" fill="#0a84ff" font-weight="700">TUCKED ELBOWS</text>
    </svg>
  `,

  // 9. Gorilla Rows
  gorilla_rows: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <line x1="30" y1="165" x2="210" y2="165" stroke="currentColor" opacity="0.2" stroke-width="2" />
      <!-- Wide feet -->
      <path d="M 75 163 L 65 163" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <path d="M 165 163 L 175 163" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <!-- Wide deep squat-hinge legs -->
      <path d="M 75 163 L 88 125 L 115 105" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <path d="M 165 163 L 152 125 L 125 105" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <!-- Low flat torso -->
      <path d="M 120 105 L 120 72" stroke="currentColor" stroke-width="12" stroke-linecap="round" />
      <circle cx="120" cy="60" r="10" fill="currentColor" opacity="0.9" />
      <!-- Left arm resting on dumbbell on floor -->
      <path d="M 112 76 L 98 120 L 98 152" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <rect x="90" y="152" width="16" height="10" rx="2" fill="#8e8e93" />
      <!-- Right arm rowing high to hip -->
      <path d="M 128 76 L 145 92 L 140 108" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <circle cx="138" cy="85" r="5" fill="#0a84ff" />
      <!-- Dumbbell at hip -->
      <rect x="132" y="102" width="16" height="10" rx="2" fill="#ff9500" />
    </svg>
  `,

  // 10. Arnold Press
  arnold_press: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <circle cx="120" cy="38" r="11" fill="currentColor" opacity="0.9" />
      <path d="M 113 50 L 127 50 L 124 105 L 116 105 Z" fill="currentColor" opacity="0.85" />
      <path d="M 117 105 L 115 163" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <path d="M 123 105 L 125 163" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <!-- Deltoids Highlight -->
      <circle cx="107" cy="54" r="5" fill="#0a84ff" />
      <circle cx="133" cy="54" r="5" fill="#0a84ff" />
      <!-- Rotating press path -->
      <!-- Left arm starting palms in -->
      <path d="M 112 52 L 95 65 L 98 80" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <rect x="92" y="75" width="12" height="10" rx="2" fill="#ff9500" />
      <!-- Right arm pressing overhead rotated out -->
      <path d="M 128 52 L 145 45 L 155 25" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <rect x="148" y="15" width="16" height="8" rx="2" fill="#ff9500" />
      <!-- Rotational Arrow -->
      <path d="M 125 60 C 135 60 145 55 148 40" fill="none" stroke="#30d158" stroke-width="2" stroke-linecap="round" />
      <polygon points="145,43 148,36 152,42" fill="#30d158" />
    </svg>
  `,

  // 11. Bulgarian Split Squat
  bulgarian_split_squat: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <line x1="30" y1="165" x2="210" y2="165" stroke="currentColor" opacity="0.2" stroke-width="2" />
      <!-- Bench / Chair on right -->
      <rect x="165" y="125" width="40" height="8" rx="2" fill="#8e8e93" />
      <line x1="172" y1="133" x2="172" y2="165" stroke="#8e8e93" stroke-width="3" />
      <line x1="198" y1="133" x2="198" y2="165" stroke="#8e8e93" stroke-width="3" />
      <!-- Torso slightly tilted forward -->
      <circle cx="95" cy="50" r="10" fill="currentColor" opacity="0.9" />
      <path d="M 90 62 L 105 62 L 102 110 L 92 110 Z" fill="currentColor" opacity="0.85" />
      <!-- Front Working Quad (90 deg angle) -->
      <path d="M 97 110 L 80 125" stroke="#0a84ff" stroke-width="8" stroke-linecap="round" />
      <path d="M 80 125 L 82 163" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <path d="M 82 163 L 70 163" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <!-- Rear leg reaching back onto bench -->
      <path d="M 102 110 L 135 130 L 168 125" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <ellipse cx="172" cy="123" rx="5" ry="3" fill="currentColor" />
      <!-- Dumbbells at sides -->
      <path d="M 98 68 L 98 105" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
      <rect x="94" y="100" width="8" height="16" rx="2" fill="#ff9500" />
      <!-- Glute activation highlight -->
      <circle cx="102" cy="112" r="5" fill="#30d158" />
    </svg>
  `,

  // 12. Upright Row
  upright_row: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <circle cx="120" cy="40" r="11" fill="currentColor" opacity="0.9" />
      <path d="M 113 52 L 127 52 L 124 105 L 116 105 Z" fill="currentColor" opacity="0.85" />
      <path d="M 117 105 L 115 163" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <path d="M 123 105 L 125 163" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <!-- High Elbows leading pull -->
      <path d="M 114 55 L 90 55 L 114 80" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <path d="M 126 55 L 150 55 L 126 80" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <!-- Traps & Delts highlight -->
      <circle cx="114" cy="50" r="4" fill="#0a84ff" />
      <circle cx="126" cy="50" r="4" fill="#0a84ff" />
      <!-- Dumbbells at mid-chest -->
      <rect x="110" y="78" width="20" height="8" rx="2" fill="#ff9500" />
      <!-- High elbows indicator -->
      <circle cx="88" cy="55" r="4" fill="#30d158" />
      <circle cx="152" cy="55" r="4" fill="#30d158" />
    </svg>
  `,

  // 13. Renegade Rows
  renegade_rows: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <line x1="30" y1="165" x2="210" y2="165" stroke="currentColor" opacity="0.2" stroke-width="2" />
      <!-- Push-up Plank position -->
      <circle cx="180" cy="78" r="10" fill="currentColor" opacity="0.9" />
      <!-- Torso in straight line -->
      <path d="M 172 85 L 105 115" stroke="currentColor" stroke-width="12" stroke-linecap="round" />
      <!-- Core tension highlight -->
      <line x1="150" y1="95" x2="120" y2="108" stroke="#0a84ff" stroke-width="5" stroke-linecap="round" />
      <!-- Legs extended -->
      <path d="M 105 115 L 55 160" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <!-- Supporting Left arm on hex dumbbell on floor -->
      <path d="M 165 90 L 165 152" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <rect x="157" y="152" width="16" height="10" rx="2" fill="#8e8e93" />
      <!-- Right arm rowing dumbbell to hip -->
      <path d="M 155 90 L 140 105 L 125 105" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <rect x="120" y="100" width="16" height="10" rx="2" fill="#ff9500" />
      <!-- Anti-rotation arrow indicator -->
      <path d="M 130 85 C 135 80 145 80 150 85" fill="none" stroke="#30d158" stroke-width="2" stroke-linecap="round" />
    </svg>
  `,

  // 14. Mike Tyson Push-ups
  mike_tyson_pushups: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <line x1="25" y1="165" x2="215" y2="165" stroke="currentColor" opacity="0.25" stroke-width="3" />
      <!-- Wall on left -->
      <line x1="30" y1="80" x2="30" y2="165" stroke="#8e8e93" stroke-width="4" stroke-linecap="round" />
      <!-- Deep crouch recoil position -->
      <circle cx="115" cy="115" r="9" fill="currentColor" opacity="0.9" />
      <!-- Torso crouched low -->
      <path d="M 108 122 L 75 132" stroke="currentColor" stroke-width="10" stroke-linecap="round" />
      <!-- Knees bent back to feet against wall -->
      <path d="M 75 132 L 52 145 L 32 140" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Hands on floor -->
      <path d="M 112 125 L 125 145 L 138 162" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <!-- Exploding Surge Arrow -->
      <path d="M 95 100 Q 135 85 165 95" fill="none" stroke="#ff9500" stroke-width="3" stroke-dasharray="4 2" />
      <polygon points="163,89 172,97 161,100" fill="#ff9500" />
      <text x="135" y="75" font-size="10" fill="#ff9500" font-weight="700">EXPLODE FORWARD</text>
    </svg>
  `,

  // 15. Single-Leg RDL
  single_leg_rdl: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <line x1="30" y1="165" x2="210" y2="165" stroke="currentColor" opacity="0.2" stroke-width="2" />
      <!-- Standing leg slightly soft knee -->
      <path d="M 125 163 L 122 125 L 115 95" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <circle cx="120" cy="110" r="5" fill="#0a84ff" />
      <!-- Torso and Trailing leg in straight horizontal line -->
      <path d="M 65 95 L 165 95" stroke="currentColor" stroke-width="10" stroke-linecap="round" />
      <!-- Head -->
      <circle cx="175" cy="95" r="9" fill="currentColor" opacity="0.9" />
      <!-- Back leg extended back -->
      <line x1="115" y1="95" x2="60" y2="95" stroke="#0a84ff" stroke-width="7" stroke-linecap="round" />
      <!-- Arm holding dumbbell down toward floor -->
      <path d="M 150 98 L 140 140" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <rect x="132" y="138" width="16" height="8" rx="2" fill="#ff9500" />
      <!-- Hamstring tension line -->
      <text x="75" y="80" font-size="9" fill="#0a84ff" font-weight="700">LEVEL HIPS</text>
    </svg>
  `,

  // 16. Glute Bridge
  glute_bridge: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <line x1="30" y1="155" x2="210" y2="155" stroke="currentColor" opacity="0.2" stroke-width="2" />
      <!-- Head and shoulders flat on floor -->
      <circle cx="55" cy="145" r="10" fill="currentColor" opacity="0.9" />
      <path d="M 65 148 L 85 148" stroke="currentColor" stroke-width="8" stroke-linecap="round" />
      <!-- Torso bridging straight up into hips -->
      <path d="M 85 148 L 125 108" stroke="currentColor" stroke-width="11" stroke-linecap="round" />
      <!-- Squeezing Glute at peak -->
      <circle cx="125" cy="108" r="9" fill="#0a84ff" />
      <!-- Thigh down to knees -->
      <path d="M 125 108 L 165 110" stroke="#0a84ff" stroke-width="8" stroke-linecap="round" />
      <!-- Shins down to floor -->
      <path d="M 165 110 L 168 153" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <!-- Flat feet driving into ground -->
      <path d="M 168 153 L 155 153" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <!-- Upward Hip thrust arrow -->
      <path d="M 125 130 L 125 90" stroke="#30d158" stroke-width="2" stroke-linecap="round" />
      <polygon points="121,93 125,86 129,93" fill="#30d158" />
      <text x="100" y="80" font-size="9" fill="#30d158" font-weight="700">2s GLUTE SQUEEZE</text>
    </svg>
  `,

  // 17. Rear Delt Fly
  rear_delt_fly: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <line x1="40" y1="165" x2="200" y2="165" stroke="currentColor" opacity="0.2" stroke-width="2" />
      <!-- Legs hinged deeply -->
      <path d="M 115 163 L 110 130 L 120 100" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <!-- Flat Torso almost parallel -->
      <path d="M 120 100 L 160 90" stroke="currentColor" stroke-width="12" stroke-linecap="round" />
      <circle cx="170" cy="85" r="10" fill="currentColor" opacity="0.9" />
      <!-- Rear Delts Highlight -->
      <circle cx="145" cy="88" r="6" fill="#0a84ff" />
      <!-- Arms flying wide like wings -->
      <path d="M 145 90 L 140 60 L 130 50" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <rect x="122" y="44" width="14" height="8" rx="2" fill="#ff9500" />
      <!-- Upward arc -->
      <path d="M 148 115 C 155 90 150 70 140 55" fill="none" stroke="#0a84ff" stroke-width="2" stroke-dasharray="3 2" />
    </svg>
  `,

  // 18. Dead Bugs
  dead_bugs: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <line x1="30" y1="140" x2="210" y2="140" stroke="currentColor" opacity="0.2" stroke-width="2" />
      <!-- Spine flat on floor -->
      <circle cx="70" cy="130" r="10" fill="currentColor" opacity="0.9" />
      <path d="M 80 132 L 145 132" stroke="currentColor" stroke-width="12" stroke-linecap="round" />
      <!-- Core glued down highlight -->
      <line x1="95" y1="126" x2="130" y2="126" stroke="#0a84ff" stroke-width="6" stroke-linecap="round" />
      <!-- Right arm extended overhead -->
      <path d="M 90 132 L 50 120" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <!-- Left arm straight up to ceiling -->
      <path d="M 95 132 L 95 80" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <!-- Stationary leg bent 90 deg -->
      <path d="M 145 132 L 145 95 L 175 95" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Opposite leg extending straight out hover -->
      <path d="M 145 132 L 195 125" stroke="#0a84ff" stroke-width="6" stroke-linecap="round" />
      <text x="95" y="65" font-size="9" fill="#0a84ff" font-weight="700">FLAT LUMBAR SPINE</text>
    </svg>
  `,

  // 19. Reverse Crunches
  reverse_crunches: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <line x1="30" y1="150" x2="210" y2="150" stroke="currentColor" opacity="0.2" stroke-width="2" />
      <!-- Head and shoulders on floor -->
      <circle cx="65" cy="140" r="10" fill="currentColor" opacity="0.9" />
      <path d="M 75 142 L 110 142" stroke="currentColor" stroke-width="10" stroke-linecap="round" />
      <!-- Pelvis curling up off ground -->
      <path d="M 110 142 L 135 125" stroke="#0a84ff" stroke-width="10" stroke-linecap="round" />
      <!-- Knees tucked toward chest -->
      <path d="M 135 125 L 125 85 L 155 75" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Arms pressing lightly on floor -->
      <path d="M 85 142 L 115 148" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <!-- Curl arrow -->
      <path d="M 148 135 C 155 120 150 100 135 90" fill="none" stroke="#30d158" stroke-width="2" stroke-linecap="round" />
      <polygon points="138,88 130,88 134,95" fill="#30d158" />
    </svg>
  `,

  // 20. Side Plank
  side_plank: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <line x1="30" y1="160" x2="210" y2="160" stroke="currentColor" opacity="0.2" stroke-width="2" />
      <!-- Head in alignment -->
      <circle cx="165" cy="65" r="10" fill="currentColor" opacity="0.9" />
      <!-- Straight diagonal body line -->
      <path d="M 155 75 L 75 150" stroke="currentColor" stroke-width="12" stroke-linecap="round" />
      <!-- Oblique & lateral core highlight -->
      <line x1="130" y1="98" x2="105" y2="122" stroke="#0a84ff" stroke-width="7" stroke-linecap="round" />
      <!-- Forearm on floor directly under shoulder -->
      <path d="M 142 87 L 142 155 L 165 155" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Stacked feet on floor -->
      <ellipse cx="72" cy="154" rx="6" ry="4" fill="currentColor" />
      <!-- Top arm reaching high or on hip -->
      <path d="M 140 85 L 140 50" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
      <!-- Hip lift arrow -->
      <path d="M 115 130 L 115 110" stroke="#30d158" stroke-width="2" stroke-linecap="round" />
      <polygon points="112,112 115,105 118,112" fill="#30d158" />
    </svg>
  `,

  // 21. Pallof-Style Press
  pallof_press: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <circle cx="120" cy="40" r="11" fill="currentColor" opacity="0.9" />
      <path d="M 113 52 L 127 52 L 124 105 L 116 105 Z" fill="currentColor" opacity="0.85" />
      <path d="M 117 105 L 112 163" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <path d="M 123 105 L 128 163" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <!-- Deep core & obliques braced -->
      <rect x="115" y="70" width="10" height="25" rx="3" fill="#0a84ff" />
      <!-- Arms pressing dumbbell straight out -->
      <path d="M 118 60 L 155 70" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <rect x="155" y="62" width="16" height="16" rx="3" fill="#ff9500" />
      <!-- Anti-rotation resistance arrows -->
      <path d="M 140 52 C 130 50 110 50 100 56" fill="none" stroke="#30d158" stroke-width="2" stroke-dasharray="3 2" />
      <text x="75" y="45" font-size="9" fill="#30d158" font-weight="700">RESIST ROTATION</text>
    </svg>
  `,

  // 22. Plank to Push-up
  plank_to_pushup: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <line x1="30" y1="160" x2="210" y2="160" stroke="currentColor" opacity="0.2" stroke-width="2" />
      <circle cx="175" cy="80" r="10" fill="currentColor" opacity="0.9" />
      <path d="M 165 88 L 100 120" stroke="currentColor" stroke-width="12" stroke-linecap="round" />
      <line x1="145" y1="98" x2="115" y2="112" stroke="#0a84ff" stroke-width="6" stroke-linecap="round" />
      <path d="M 100 120 L 50 155" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <!-- One arm planted in high pushup, one climbing up -->
      <path d="M 155 92 L 155 155" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <path d="M 162 92 L 175 125 L 175 155" fill="none" stroke="#30d158" stroke-width="5" stroke-linecap="round" />
      <text x="110" y="70" font-size="9" fill="#30d158" font-weight="700">STEADY HIPS</text>
    </svg>
  `,

  // 23. Lying Leg Raises
  lying_leg_raises: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <line x1="30" y1="150" x2="210" y2="150" stroke="currentColor" opacity="0.2" stroke-width="2" />
      <circle cx="65" cy="140" r="10" fill="currentColor" opacity="0.9" />
      <path d="M 75 142 L 140 142" stroke="currentColor" stroke-width="12" stroke-linecap="round" />
      <line x1="95" y1="136" x2="128" y2="136" stroke="#0a84ff" stroke-width="6" stroke-linecap="round" />
      <!-- Legs raised to 45 deg descending under control -->
      <path d="M 140 142 L 180 95" stroke="#0a84ff" stroke-width="7" stroke-linecap="round" />
      <!-- Lowering arrow -->
      <path d="M 185 98 C 195 110 198 125 195 138" fill="none" stroke="#ff9500" stroke-width="2" stroke-linecap="round" />
      <polygon points="191,135 195,142 199,135" fill="#ff9500" />
      <text x="120" y="80" font-size="9" fill="#ff9500" font-weight="700">SLOW ECCENTRIC</text>
    </svg>
  `,

  // 24. Suitcase Hold
  suitcase_hold: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <circle cx="120" cy="40" r="11" fill="currentColor" opacity="0.9" />
      <path d="M 113 52 L 127 52 L 124 105 L 116 105 Z" fill="currentColor" opacity="0.85" />
      <path d="M 117 105 L 115 163" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <path d="M 123 105 L 125 163" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <!-- One side holding heavy dumbbell -->
      <path d="M 112 55 L 105 95 L 105 115" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <rect x="98" y="112" width="14" height="24" rx="3" fill="#ff9500" />
      <!-- Opposite obliques resisting lean -->
      <line x1="125" y1="65" x2="125" y2="95" stroke="#0a84ff" stroke-width="6" stroke-linecap="round" />
      <text x="135" y="75" font-size="9" fill="#0a84ff" font-weight="700">DON'T LEAN</text>
    </svg>
  `,

  // 25. Bird Dogs
  bird_dogs: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <line x1="30" y1="155" x2="210" y2="155" stroke="currentColor" opacity="0.2" stroke-width="2" />
      <circle cx="165" cy="88" r="9" fill="currentColor" opacity="0.9" />
      <!-- Flat tabletop back -->
      <path d="M 155 95 L 95 95" stroke="currentColor" stroke-width="11" stroke-linecap="round" />
      <line x1="110" y1="90" x2="140" y2="90" stroke="#0a84ff" stroke-width="5" stroke-linecap="round" />
      <!-- Left knee down under hip -->
      <path d="M 115 95 L 115 152" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <!-- Right hand down under shoulder -->
      <path d="M 145 95 L 145 152" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <!-- Opposite arm extending forward -->
      <path d="M 155 95 L 205 95" stroke="#0a84ff" stroke-width="5" stroke-linecap="round" />
      <!-- Opposite leg extending backward -->
      <path d="M 95 95 L 45 95" stroke="#0a84ff" stroke-width="6" stroke-linecap="round" />
      <text x="95" y="65" font-size="9" fill="#0a84ff" font-weight="700">LEVEL HIPS • PAUSE 2S</text>
    </svg>
  `,

  // 26. Diaphragmatic Breathing
  diaphragmatic_breathing: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <line x1="30" y1="150" x2="210" y2="150" stroke="currentColor" opacity="0.2" stroke-width="2" />
      <circle cx="65" cy="140" r="10" fill="currentColor" opacity="0.9" />
      <!-- Relaxed supine posture -->
      <path d="M 75 142 L 140 142" stroke="currentColor" stroke-width="10" stroke-linecap="round" />
      <path d="M 140 142 L 165 118 L 180 148" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <!-- Hand on belly -->
      <path d="M 85 142 L 105 125 L 115 135" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
      <!-- 360 Breathing Expansion Waves -->
      <circle cx="112" cy="132" r="18" fill="none" stroke="#0a84ff" stroke-width="1.8" stroke-dasharray="3 3" opacity="0.7" />
      <circle cx="112" cy="132" r="28" fill="none" stroke="#5ac8fa" stroke-width="1.2" stroke-dasharray="4 3" opacity="0.4" />
      <text x="85" y="85" font-size="10" fill="#0a84ff" font-weight="700">BELLY EXPANDS 360°</text>
    </svg>
  `,

  // 27. Slow Kegels
  slow_kegels: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <!-- Pelvic floor sling vector diagram -->
      <path d="M 70 80 Q 120 145 170 80" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <circle cx="70" cy="80" r="7" fill="#8e8e93" />
      <circle cx="170" cy="80" r="7" fill="#8e8e93" />
      <!-- Upward lift vector arrows -->
      <path d="M 120 125 L 120 70" stroke="#0a84ff" stroke-width="4" stroke-linecap="round" />
      <polygon points="114,75 120,62 126,75" fill="#0a84ff" />
      <!-- Contracted pelvic sling -->
      <path d="M 75 80 Q 120 105 165 80" fill="none" stroke="#30d158" stroke-width="3" stroke-dasharray="3 2" />
      <text x="75" y="45" font-size="11" fill="#0a84ff" font-weight="700">SQUEEZE & LIFT (HOLD 5s)</text>
      <text x="85" y="155" font-size="9" fill="#8e8e93">FULL RELEASE ON INHALE</text>
    </svg>
  `,

  // 28. Quick Flicks
  quick_flicks: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <!-- Pelvic pulse waves -->
      <path d="M 60 90 Q 120 140 180 90" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
      <!-- Rapid Pulse icons -->
      <path d="M 100 105 L 110 80 L 120 115 L 130 90 L 140 105" fill="none" stroke="#ff9500" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      <text x="75" y="55" font-size="11" fill="#ff9500" font-weight="700">FAST PULSE • 1s REPS</text>
      <text x="70" y="150" font-size="9" fill="#8e8e93">100% RELAX BETWEEN FLICKS</text>
    </svg>
  `,

  // 29. Deep Squat Breathing / Malasana
  deep_squat_breathing: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <line x1="40" y1="162" x2="200" y2="162" stroke="currentColor" opacity="0.2" stroke-width="2" />
      <circle cx="120" cy="55" r="11" fill="currentColor" opacity="0.9" />
      <path d="M 112 68 L 128 68 L 124 105 L 116 105 Z" fill="currentColor" opacity="0.85" />
      <!-- Deep squat legs opened wide -->
      <path d="M 116 105 L 75 110 L 82 158" fill="none" stroke="#0a84ff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M 124 105 L 165 110 L 158 158" fill="none" stroke="#0a84ff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Palms together pressing knees out -->
      <path d="M 113 72 L 95 95 L 118 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
      <path d="M 127 72 L 145 95 L 122 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
      <circle cx="120" cy="100" r="4" fill="#30d158" />
      <text x="80" y="35" font-size="10" fill="#0a84ff" font-weight="700">PELVIC FLOOR RELAXATION</text>
    </svg>
  `,

  // 30. 90/90 Hip Switches
  hip_switches_9090: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <circle cx="120" cy="45" r="11" fill="currentColor" opacity="0.9" />
      <path d="M 113 58 L 127 58 L 123 110 L 117 110 Z" fill="currentColor" opacity="0.85" />
      <!-- Front leg in 90 deg external rotation -->
      <path d="M 117 110 L 80 120 L 95 155" fill="none" stroke="#0a84ff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Trail leg in 90 deg internal rotation -->
      <path d="M 123 110 L 155 125 L 180 115" fill="none" stroke="#0a84ff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Rotation Arc Switch -->
      <path d="M 70 145 C 100 170 140 170 170 145" fill="none" stroke="#30d158" stroke-width="2.5" stroke-dasharray="4 2" />
      <polygon points="168,142 176,144 171,150" fill="#30d158" />
      <text x="75" y="30" font-size="10" fill="#0a84ff" font-weight="700">TALL SPINE • ROTATE HIPS</text>
    </svg>
  `,

  // 31. World's Greatest Stretch
  worlds_greatest_stretch: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <line x1="30" y1="165" x2="210" y2="165" stroke="currentColor" opacity="0.2" stroke-width="2" />
      <!-- Deep runner's lunge -->
      <circle cx="130" cy="70" r="10" fill="currentColor" opacity="0.9" />
      <!-- Torso rotating open -->
      <path d="M 125 80 L 115 120" stroke="currentColor" stroke-width="10" stroke-linecap="round" />
      <!-- Front leg at 90 deg -->
      <path d="M 115 120 L 85 130 L 85 163" fill="none" stroke="#0a84ff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Back leg straight back -->
      <path d="M 115 120 L 180 155 L 195 163" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <!-- Down arm touching floor inside ankle -->
      <path d="M 120 90 L 95 130 L 95 162" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <!-- Top arm reaching straight to sky -->
      <path d="M 128 80 L 150 40" stroke="#0a84ff" stroke-width="5" stroke-linecap="round" />
      <circle cx="152" cy="38" r="4" fill="#30d158" />
      <text x="145" y="30" font-size="9" fill="#30d158" font-weight="700">REACH TO SKY</text>
    </svg>
  `,

  // 32. Leg Swings
  leg_swings: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <line x1="40" y1="165" x2="200" y2="165" stroke="currentColor" opacity="0.2" stroke-width="2" />
      <!-- Wall on right -->
      <line x1="175" y1="40" x2="175" y2="165" stroke="#8e8e93" stroke-width="3" stroke-linecap="round" />
      <circle cx="130" cy="45" r="10" fill="currentColor" opacity="0.9" />
      <path d="M 125 57 L 135 57 L 132 110 L 128 110 Z" fill="currentColor" opacity="0.85" />
      <!-- Hand on wall -->
      <path d="M 134 65 L 175 75" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
      <!-- Standing leg -->
      <path d="M 132 110 L 135 163" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <!-- Swinging leg in motion arc -->
      <path d="M 128 110 L 95 135" stroke="#0a84ff" stroke-width="6" stroke-linecap="round" />
      <!-- Pendulum motion trail -->
      <path d="M 70 145 C 90 160 140 160 160 140" fill="none" stroke="#0a84ff" stroke-width="2" stroke-dasharray="3 2" />
      <text x="75" y="40" font-size="9" fill="#0a84ff" font-weight="700">SMOOTH HIP PENDULUM</text>
    </svg>
  `,

  // 33. Deep Squat Hold
  deep_squat_hold: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <line x1="40" y1="162" x2="200" y2="162" stroke="currentColor" opacity="0.2" stroke-width="2" />
      <circle cx="120" cy="55" r="11" fill="currentColor" opacity="0.9" />
      <path d="M 112 68 L 128 68 L 124 108 L 116 108 Z" fill="currentColor" opacity="0.85" />
      <!-- Deep squat hold posture -->
      <path d="M 116 108 L 80 115 L 85 158" fill="none" stroke="#0a84ff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M 124 108 L 160 115 L 155 158" fill="none" stroke="#0a84ff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Heels flat -->
      <path d="M 85 158 L 72 160" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <path d="M 155 158 L 168 160" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <!-- Elbows wedged into knees -->
      <path d="M 114 75 L 98 105 L 115 108" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
      <path d="M 126 75 L 142 105 L 125 108" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
      <text x="80" y="35" font-size="10" fill="#30d158" font-weight="700">HEELS DOWN • KNEES OUT</text>
    </svg>
  `,

  // 34. Jump Squats
  jump_squats: `
    <svg viewBox="0 0 240 180" class="ex-svg">
      <!-- Ground shadow -->
      <ellipse cx="120" cy="165" rx="35" ry="6" fill="rgba(0,0,0,0.12)" />
      <!-- Explosive jump in air -->
      <circle cx="120" cy="35" r="11" fill="currentColor" opacity="0.9" />
      <path d="M 113 47 L 127 47 L 124 95 L 116 95 Z" fill="currentColor" opacity="0.85" />
      <!-- Arms driving back or up -->
      <path d="M 113 52 L 95 40" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <path d="M 127 52 L 145 40" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <!-- Legs extending downward hovering off floor -->
      <path d="M 116 95 L 110 125 L 114 148" fill="none" stroke="#0a84ff" stroke-width="6" stroke-linecap="round" />
      <path d="M 124 95 L 130 125 L 126 148" fill="none" stroke="#0a84ff" stroke-width="6" stroke-linecap="round" />
      <!-- Explosive blast trails -->
      <line x1="108" y1="162" x2="114" y2="152" stroke="#ff9500" stroke-width="2.5" stroke-linecap="round" />
      <line x1="120" y1="162" x2="120" y2="152" stroke="#ff9500" stroke-width="2.5" stroke-linecap="round" />
      <line x1="132" y1="162" x2="126" y2="152" stroke="#ff9500" stroke-width="2.5" stroke-linecap="round" />
      <text x="80" y="20" font-size="10" fill="#ff9500" font-weight="700">EXPLODE UP • SOFT LANDING</text>
    </svg>
  `
};

