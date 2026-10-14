/**
 * FORTIS - 3D Animated Exercise Engine
 * Realistic 3D-shaded anatomical figures with smooth continuous biomechanical looping animations.
 * Style matches the user's 3D athletic mannequin with shaded volume, lighting, and apparel.
 */

window.EXERCISE_ILLUSTRATIONS = {
  // 1. Bulgarian Split Squat (Matching user reference image style)
  bulgarian_split_squat: `
    <svg viewBox="0 0 280 200" class="ex-3d-svg">
      <defs>
        <!-- 3D Skin Gradients -->
        <linearGradient id="skin3D" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fee3cc" />
          <stop offset="50%" stop-color="#f5ba90" />
          <stop offset="100%" stop-color="#df9262" />
        </linearGradient>
        <linearGradient id="skinShadow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#f5ba90" />
          <stop offset="100%" stop-color="#c97445" />
        </linearGradient>
        <!-- 3D Shorts Gradient (Midnight Navy) -->
        <linearGradient id="shorts3D" x1="0%" y1="0%" x2="100%" y2="80%">
          <stop offset="0%" stop-color="#2554d7" />
          <stop offset="60%" stop-color="#123088" />
          <stop offset="100%" stop-color="#091b52" />
        </linearGradient>
        <!-- 3D Dumbbell Gradient (Cyan / Teal) -->
        <linearGradient id="db3D" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#22d3ee" />
          <stop offset="50%" stop-color="#06b6d4" />
          <stop offset="100%" stop-color="#0891b2" />
        </linearGradient>
        <filter id="shadow3D" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="6" stdDeviation="4" flood-color="#000" flood-opacity="0.35"/>
        </filter>
      </defs>

      <style>
        .split-squat-mover {
          animation: bssAnim calc(3s * var(--anim-rate, 1)) ease-in-out infinite;
          transform-origin: 120px 180px;
        }
        @keyframes bssAnim {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(18px); }
        }
        .quad-glow {
          animation: quadGlowAnim calc(3s * var(--anim-rate, 1)) ease-in-out infinite;
        }
        @keyframes quadGlowAnim {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.85; filter: drop-shadow(0 0 6px #cba153); }
        }
      </style>

      <!-- Floor Line -->
      <line x1="20" y1="180" x2="260" y2="180" stroke="rgba(255,255,255,0.12)" stroke-width="2" stroke-linecap="round"/>

      <!-- Sturdy Bench on right -->
      <g id="bench">
        <rect x="200" y="140" width="55" height="10" rx="3" fill="#333842" stroke="#4b5563" stroke-width="1.5" />
        <line x1="210" y1="150" x2="210" y2="180" stroke="#4b5563" stroke-width="3" stroke-linecap="round"/>
        <line x1="245" y1="150" x2="245" y2="180" stroke="#4b5563" stroke-width="3" stroke-linecap="round"/>
      </g>

      <!-- Animated Moving Body Group -->
      <g class="split-squat-mover">
        <!-- Rear Elevated Leg on Bench -->
        <path d="M 140 120 Q 175 130 205 138 Q 215 139 218 143" fill="none" stroke="url(#skinShadow)" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M 215 142 L 226 139" stroke="url(#skin3D)" stroke-width="9" stroke-linecap="round"/>

        <!-- Front Standing Leg (Moving into 90° lunge) -->
        <path d="M 130 115 L 105 132" stroke="url(#skin3D)" stroke-width="18" stroke-linecap="round"/>
        <!-- Front Active Quad Glow -->
        <path class="quad-glow" d="M 125 118 L 108 132" stroke="#cba153" stroke-width="8" stroke-linecap="round"/>
        <!-- Shin & Foot -->
        <path d="M 105 132 L 105 178" stroke="url(#skin3D)" stroke-width="14" stroke-linecap="round"/>
        <path d="M 105 178 L 88 180" stroke="url(#skinShadow)" stroke-width="9" stroke-linecap="round"/>

        <!-- Athletic Shorts -->
        <path d="M 120 100 Q 146 100 148 116 L 140 148 L 115 138 Z" fill="url(#shorts3D)" filter="url(#shadow3D)"/>

        <!-- 3D Torso (Upright athletic posture) -->
        <path d="M 122 62 Q 138 60 142 85 Q 140 105 125 106 Z" fill="url(#skin3D)" filter="url(#shadow3D)"/>
        <!-- Pectoral / Rib line shading -->
        <path d="M 126 78 Q 134 82 136 92" stroke="url(#skinShadow)" stroke-width="2.5" fill="none"/>

        <!-- 3D Head & Neck -->
        <path d="M 127 52 L 131 62" stroke="url(#skinShadow)" stroke-width="8" stroke-linecap="round"/>
        <ellipse cx="132" cy="40" rx="11" ry="13" fill="url(#skin3D)" filter="url(#shadow3D)"/>
        <circle cx="125" cy="44" r="3.5" fill="url(#skinShadow)" opacity="0.6"/>

        <!-- Hanging Arm holding 3D Cyan Dumbbell -->
        <path d="M 134 68 L 132 105 L 132 125" stroke="url(#skin3D)" stroke-width="10" stroke-linecap="round"/>
        <ellipse cx="132" cy="125" rx="5" ry="6" fill="url(#skinShadow)"/>

        <!-- 3D Dumbbell (Teal hex head like user image) -->
        <rect x="114" y="121" width="36" height="8" rx="2" fill="url(#db3D)" filter="url(#shadow3D)"/>
        <rect x="110" y="117" width="8" height="16" rx="2.5" fill="url(#db3D)"/>
        <rect x="142" y="117" width="8" height="16" rx="2.5" fill="url(#db3D)"/>
      </g>

      <!-- Target Badge -->
      <g transform="translate(25, 30)">
        <rect width="70" height="20" rx="4" fill="rgba(203,161,83,0.15)" stroke="#cba153" stroke-width="1"/>
        <text x="35" y="14" fill="#cba153" font-size="9" font-weight="800" text-anchor="middle">QUADS & GLUTES</text>
      </g>
    </svg>
  `,

  // 2. Goblet Squat (3D Deep Squat & Vertical Dumbbell)
  goblet_squat: `
    <svg viewBox="0 0 280 200" class="ex-3d-svg">
      <defs>
        <linearGradient id="skinGob" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fee3cc" />
          <stop offset="60%" stop-color="#f5ba90" />
          <stop offset="100%" stop-color="#df9262" />
        </linearGradient>
        <linearGradient id="shortsGob" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2554d7" />
          <stop offset="100%" stop-color="#0a1a44" />
        </linearGradient>
        <linearGradient id="dbGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffd880" />
          <stop offset="50%" stop-color="#cba153" />
          <stop offset="100%" stop-color="#8b6823" />
        </linearGradient>
      </defs>

      <style>
        .goblet-squat-loop {
          animation: squatDepthLoop calc(3.2s * var(--anim-rate, 1)) cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
          transform-origin: 140px 180px;
        }
        @keyframes squatDepthLoop {
          0%, 100% { transform: translateY(0) scaleY(1); }
          50% { transform: translateY(24px) scaleY(0.92); }
        }
        .quad-active {
          animation: quadBurn calc(3.2s * var(--anim-rate, 1)) infinite;
        }
        @keyframes quadBurn {
          0%, 100% { opacity: 0.2; }
          45%, 55% { opacity: 0.9; filter: drop-shadow(0 0 8px #cba153); }
        }
      </style>

      <!-- Floor -->
      <line x1="30" y1="180" x2="250" y2="180" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>

      <!-- Shins anchored to floor -->
      <path d="M 105 145 L 100 178" stroke="url(#skinGob)" stroke-width="14" stroke-linecap="round"/>
      <path d="M 175 145 L 180 178" stroke="url(#skinGob)" stroke-width="14" stroke-linecap="round"/>
      <path d="M 100 178 L 88 180" stroke="#df9262" stroke-width="9" stroke-linecap="round"/>
      <path d="M 180 178 L 192 180" stroke="#df9262" stroke-width="9" stroke-linecap="round"/>

      <!-- Squatting Torso & Thighs Group -->
      <g class="goblet-squat-loop">
        <!-- 3D Thighs -->
        <path d="M 140 120 L 105 138" stroke="url(#skinGob)" stroke-width="18" stroke-linecap="round"/>
        <path d="M 140 120 L 175 138" stroke="url(#skinGob)" stroke-width="18" stroke-linecap="round"/>
        <!-- Active Quad Glow -->
        <path class="quad-active" d="M 135 122 L 110 137" stroke="#cba153" stroke-width="8" stroke-linecap="round"/>
        <path class="quad-active" d="M 145 122 L 170 137" stroke="#cba153" stroke-width="8" stroke-linecap="round"/>

        <!-- 3D Shorts -->
        <path d="M 125 105 Q 140 100 155 105 L 165 130 L 115 130 Z" fill="url(#shortsGob)"/>

        <!-- 3D Torso (Chest up tall) -->
        <path d="M 128 65 Q 140 60 152 65 L 148 108 L 132 108 Z" fill="url(#skinGob)"/>

        <!-- 3D Head -->
        <ellipse cx="140" cy="45" rx="12" ry="14" fill="url(#skinGob)"/>

        <!-- Arms wrapped cupping dumbbell head -->
        <path d="M 130 70 L 122 92 L 134 98" fill="none" stroke="url(#skinGob)" stroke-width="9" stroke-linecap="round"/>
        <path d="M 150 70 L 158 92 L 146 98" fill="none" stroke="url(#skinGob)" stroke-width="9" stroke-linecap="round"/>

        <!-- Vertical Heavy Dumbbell at sternum -->
        <rect x="134" y="80" width="12" height="32" rx="3" fill="url(#dbGold)"/>
        <rect x="127" y="77" width="26" height="8" rx="2" fill="url(#dbGold)"/>
        <rect x="127" y="104" width="26" height="8" rx="2" fill="url(#dbGold)"/>
      </g>

      <g transform="translate(25, 25)">
        <rect width="65" height="18" rx="4" fill="rgba(203,161,83,0.15)" stroke="#cba153" stroke-width="1"/>
        <text x="32" y="13" fill="#cba153" font-size="9" font-weight="800" text-anchor="middle">CHEST TALL</text>
      </g>
    </svg>
  `,

  // 3. Floor Press (3D Supine Press with Floor Pause)
  floor_press: `
    <svg viewBox="0 0 280 200" class="ex-3d-svg">
      <defs>
        <linearGradient id="skinFp" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#fee3cc" />
          <stop offset="100%" stop-color="#df9262" />
        </linearGradient>
        <linearGradient id="dbTeal" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#22d3ee" />
          <stop offset="100%" stop-color="#0891b2" />
        </linearGradient>
      </defs>

      <style>
        .press-arms {
          animation: floorPressCycle calc(3s * var(--anim-rate, 1)) cubic-bezier(0.4, 0, 0.2, 1) infinite;
          transform-origin: 105px 150px;
        }
        @keyframes floorPressCycle {
          0%, 100% { transform: translateY(0); }
          40% { transform: translateY(22px); }
          65% { transform: translateY(22px); } /* Floor Pause */
          85% { transform: translateY(0); }
        }
        .chest-fire {
          animation: chestPulse calc(3s * var(--anim-rate, 1)) infinite;
        }
        @keyframes chestPulse {
          0%, 100% { opacity: 0.8; filter: drop-shadow(0 0 5px #cba153); }
          50% { opacity: 0.2; }
        }
      </style>

      <!-- Floor -->
      <line x1="30" y1="165" x2="250" y2="165" stroke="rgba(255,255,255,0.15)" stroke-width="2.5"/>

      <!-- Body Resting on Mat -->
      <ellipse cx="65" cy="154" rx="10" ry="10" fill="url(#skinFp)"/>
      <path d="M 75 156 L 155 156" stroke="url(#skinFp)" stroke-width="16" stroke-linecap="round"/>
      <!-- Active Chest Glow -->
      <line class="chest-fire" x1="95" y1="148" x2="120" y2="148" stroke="#cba153" stroke-width="6" stroke-linecap="round"/>

      <!-- Bent Knees / Feet on Floor -->
      <path d="M 155 156 L 190 125 L 210 165" fill="none" stroke="url(#skinFp)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="145" y="145" width="25" height="15" rx="3" fill="#123088"/>

      <!-- Animated Pressing Arms & Dumbbells -->
      <g class="press-arms">
        <!-- Arm extending overhead -->
        <path d="M 105 154 L 105 92" stroke="url(#skinFp)" stroke-width="11" stroke-linecap="round"/>
        <!-- Dumbbell -->
        <rect x="85" y="85" width="40" height="9" rx="2" fill="url(#dbTeal)"/>
        <rect x="80" y="78" width="10" height="23" rx="3" fill="url(#dbTeal)"/>
        <rect x="120" y="78" width="10" height="23" rx="3" fill="url(#dbTeal)"/>
      </g>

      <g transform="translate(145, 75)">
        <rect width="85" height="20" rx="4" fill="rgba(48,209,88,0.15)" stroke="#30d158" stroke-width="1"/>
        <text x="42" y="14" fill="#30d158" font-size="9" font-weight="800" text-anchor="middle">1s FLOOR PAUSE</text>
      </g>
    </svg>
  `,

  // 4. Bent-Over Row (3D Torso Hinge & Lat Drive)
  bent_over_row: `
    <svg viewBox="0 0 280 200" class="ex-3d-svg">
      <defs>
        <linearGradient id="skinBor" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fee3cc" />
          <stop offset="100%" stop-color="#df9262" />
        </linearGradient>
      </defs>

      <style>
        .row-arm {
          animation: borCycle calc(2.8s * var(--anim-rate, 1)) ease-in-out infinite;
          transform-origin: 170px 85px;
        }
        @keyframes borCycle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-24px); }
        }
        .lat-squeeze {
          animation: latPulse calc(2.8s * var(--anim-rate, 1)) infinite;
        }
        @keyframes latPulse {
          0%, 100% { opacity: 0.2; }
          45%, 55% { opacity: 0.95; filter: drop-shadow(0 0 7px #cba153); }
        }
      </style>

      <line x1="30" y1="180" x2="250" y2="180" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>

      <!-- Legs Hinged with soft knees -->
      <path d="M 110 178 L 118 135 L 138 105" fill="none" stroke="url(#skinBor)" stroke-width="15" stroke-linecap="round"/>
      <!-- Shorts -->
      <path d="M 125 95 L 145 105 L 135 125 L 115 115 Z" fill="#123088"/>

      <!-- 45-Degree Flat Spine Torso -->
      <path d="M 138 105 L 180 75" stroke="url(#skinBor)" stroke-width="17" stroke-linecap="round"/>
      <ellipse cx="192" cy="65" rx="11" ry="12" fill="url(#skinBor)"/>

      <!-- Latissimus Highlight -->
      <path class="lat-squeeze" d="M 145 98 L 172 78" stroke="#cba153" stroke-width="7" stroke-linecap="round"/>

      <!-- Animated Rowing Arm -->
      <g class="row-arm">
        <path d="M 172 78 L 155 120" stroke="url(#skinBor)" stroke-width="10" stroke-linecap="round"/>
        <rect x="140" y="115" width="30" height="10" rx="2" fill="#22d3ee" transform="rotate(-15 155 120)"/>
        <rect x="135" y="110" width="8" height="20" rx="2" fill="#0891b2" transform="rotate(-15 155 120)"/>
        <rect x="167" y="110" width="8" height="20" rx="2" fill="#0891b2" transform="rotate(-15 155 120)"/>
      </g>

      <g transform="translate(30, 30)">
        <rect width="80" height="20" rx="4" fill="rgba(203,161,83,0.15)" stroke="#cba153" stroke-width="1"/>
        <text x="40" y="14" fill="#cba153" font-size="9" font-weight="800" text-anchor="middle">PULL TO HIP</text>
      </g>
    </svg>
  `,

  // 5. Romanian Deadlift (RDL - 3D Hip Hinge & Hamstring Stretch)
  romanian_deadlift: `
    <svg viewBox="0 0 280 200" class="ex-3d-svg">
      <defs>
        <linearGradient id="skinRdl" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fee3cc" />
          <stop offset="100%" stop-color="#df9262" />
        </linearGradient>
      </defs>

      <style>
        .rdl-torso-hinge {
          animation: rdlHingeLoop calc(3.4s * var(--anim-rate, 1)) ease-in-out infinite;
          transform-origin: 125px 115px;
        }
        @keyframes rdlHingeLoop {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(42deg); }
        }
        .hamstring-tension {
          animation: hamGlow calc(3.4s * var(--anim-rate, 1)) infinite;
        }
        @keyframes hamGlow {
          0%, 100% { opacity: 0.15; }
          45%, 55% { opacity: 0.95; filter: drop-shadow(0 0 7px #cba153); }
        }
      </style>

      <line x1="30" y1="180" x2="250" y2="180" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>

      <!-- Vertical Shins & Soft Knees -->
      <path d="M 135 178 L 132 140" stroke="url(#skinRdl)" stroke-width="14" stroke-linecap="round"/>
      <path d="M 132 140 L 125 115" stroke="url(#skinRdl)" stroke-width="16" stroke-linecap="round"/>
      <!-- Hamstring Tension Line -->
      <path class="hamstring-tension" d="M 125 115 L 133 140" stroke="#cba153" stroke-width="8" stroke-linecap="round"/>

      <!-- Hinged Upper Body -->
      <g class="rdl-torso-hinge">
        <!-- Shorts -->
        <path d="M 115 105 Q 130 98 140 105 L 132 125 L 118 122 Z" fill="#123088"/>
        <!-- Torso -->
        <path d="M 125 115 L 140 60" stroke="url(#skinRdl)" stroke-width="16" stroke-linecap="round"/>
        <ellipse cx="145" cy="46" rx="11" ry="12" fill="url(#skinRdl)"/>

        <!-- Hanging Arms with Dumbbells skimming shins -->
        <path d="M 136 72 L 152 118" stroke="url(#skinRdl)" stroke-width="10" stroke-linecap="round"/>
        <rect x="140" y="115" width="26" height="8" rx="2" fill="#22d3ee"/>
      </g>

      <g transform="translate(30, 30)">
        <rect width="85" height="20" rx="4" fill="rgba(203,161,83,0.15)" stroke="#cba153" stroke-width="1"/>
        <text x="42" y="14" fill="#cba153" font-size="9" font-weight="800" text-anchor="middle">HIPS BACK TO WALL</text>
      </g>
    </svg>
  `,

  // 6. Lateral Raise (3D Scapular Plane Fly)
  lateral_raise: `
    <svg viewBox="0 0 280 200" class="ex-3d-svg">
      <defs>
        <linearGradient id="skinLat" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fee3cc" />
          <stop offset="100%" stop-color="#df9262" />
        </linearGradient>
      </defs>

      <style>
        .left-arm-raise {
          animation: latRaiseL calc(2.8s * var(--anim-rate, 1)) ease-in-out infinite;
          transform-origin: 125px 65px;
        }
        .right-arm-raise {
          animation: latRaiseR calc(2.8s * var(--anim-rate, 1)) ease-in-out infinite;
          transform-origin: 155px 65px;
        }
        @keyframes latRaiseL {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-65deg); }
        }
        @keyframes latRaiseR {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(65deg); }
        }
        .delt-burn {
          animation: deltPulse calc(2.8s * var(--anim-rate, 1)) infinite;
        }
        @keyframes deltPulse {
          0%, 100% { opacity: 0.2; }
          45%, 55% { opacity: 0.95; filter: drop-shadow(0 0 6px #cba153); }
        }
      </style>

      <line x1="30" y1="180" x2="250" y2="180" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>

      <!-- Legs & Torso -->
      <path d="M 132 120 L 130 178" stroke="url(#skinLat)" stroke-width="13" stroke-linecap="round"/>
      <path d="M 148 120 L 150 178" stroke="url(#skinLat)" stroke-width="13" stroke-linecap="round"/>
      <path d="M 125 105 L 155 105 L 152 135 L 128 135 Z" fill="#123088"/>

      <path d="M 130 65 Q 140 60 150 65 L 148 110 L 132 110 Z" fill="url(#skinLat)"/>
      <ellipse cx="140" cy="46" rx="11" ry="13" fill="url(#skinLat)"/>

      <!-- Deltoid Muscle Highlights -->
      <circle class="delt-burn" cx="123" cy="67" r="7" fill="#cba153"/>
      <circle class="delt-burn" cx="157" cy="67" r="7" fill="#cba153"/>

      <!-- Left Raising Arm -->
      <g class="left-arm-raise">
        <path d="M 125 65 L 105 110" stroke="url(#skinLat)" stroke-width="9" stroke-linecap="round"/>
        <rect x="95" y="105" width="20" height="10" rx="2" fill="#22d3ee"/>
      </g>

      <!-- Right Raising Arm -->
      <g class="right-arm-raise">
        <path d="M 155 65 L 175 110" stroke="url(#skinLat)" stroke-width="9" stroke-linecap="round"/>
        <rect x="165" y="105" width="20" height="10" rx="2" fill="#22d3ee"/>
      </g>
    </svg>
  `,

  // 7. Dead Bugs (3D Core Bracing & Alternating Limbs)
  dead_bugs: `
    <svg viewBox="0 0 280 200" class="ex-3d-svg">
      <defs>
        <linearGradient id="skinDb" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fee3cc" />
          <stop offset="100%" stop-color="#df9262" />
        </linearGradient>
      </defs>

      <style>
        .moving-leg {
          animation: deadbugLeg calc(3.2s * var(--anim-rate, 1)) ease-in-out infinite;
          transform-origin: 160px 148px;
        }
        .moving-arm {
          animation: deadbugArm calc(3.2s * var(--anim-rate, 1)) ease-in-out infinite;
          transform-origin: 105px 145px;
        }
        @keyframes deadbugLeg {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(38deg); }
        }
        @keyframes deadbugArm {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-55deg); }
        }
      </style>

      <line x1="30" y1="155" x2="250" y2="155" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>

      <!-- Head & Spine glued flat to floor -->
      <ellipse cx="75" cy="144" rx="10" ry="11" fill="url(#skinDb)"/>
      <path d="M 85 146 L 160 146" stroke="url(#skinDb)" stroke-width="16" stroke-linecap="round"/>
      <rect x="135" y="136" width="25" height="18" rx="2" fill="#123088"/>

      <!-- Deep Core Tension Indicator -->
      <line x1="105" y1="140" x2="140" y2="140" stroke="#cba153" stroke-width="6" stroke-linecap="round"/>

      <!-- Stationary Limbs at 90° -->
      <path d="M 115 142 L 115 90" stroke="url(#skinDb)" stroke-width="9" stroke-linecap="round"/>
      <path d="M 160 145 L 160 105 L 190 105" fill="none" stroke="url(#skinDb)" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>

      <!-- Moving Extended Arm & Leg -->
      <g class="moving-arm">
        <path d="M 105 145 L 105 90" stroke="url(#skinDb)" stroke-width="9" stroke-linecap="round"/>
      </g>
      <g class="moving-leg">
        <path d="M 160 148 L 160 110 L 195 110" fill="none" stroke="url(#skinDb)" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
      </g>

      <g transform="translate(30, 30)">
        <rect width="90" height="20" rx="4" fill="rgba(203,161,83,0.15)" stroke="#cba153" stroke-width="1"/>
        <text x="45" y="14" fill="#cba153" font-size="9" font-weight="800" text-anchor="middle">LOWER BACK GLUED</text>
      </g>
    </svg>
  `,

  // 8. Skipping / Jump Rope (3D Dynamic Perspective Arc)
  skipping: `
    <svg viewBox="0 0 280 200" class="ex-3d-svg">
      <defs>
        <linearGradient id="skinSkip" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fee3cc" />
          <stop offset="100%" stop-color="#df9262" />
        </linearGradient>
        <linearGradient id="ropeGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffd880" />
          <stop offset="100%" stop-color="#cba153" />
        </linearGradient>
      </defs>

      <style>
        .skip-bouncer {
          animation: skipBounce calc(0.65s * var(--anim-rate, 1)) cubic-bezier(0.2, 0.8, 0.4, 1) infinite alternate;
        }
        @keyframes skipBounce {
          0% { transform: translateY(0); }
          100% { transform: translateY(-16px); }
        }
        .rope-3d-spin {
          animation: ropeSpinLoop calc(0.65s * var(--anim-rate, 1)) linear infinite;
          transform-origin: 140px 110px;
        }
        @keyframes ropeSpinLoop {
          0% { stroke-dashoffset: 0; opacity: 0.9; }
          50% { stroke-dashoffset: 80; opacity: 0.35; }
          100% { stroke-dashoffset: 160; opacity: 0.9; }
        }
      </style>

      <!-- Ground shadow -->
      <ellipse cx="140" cy="180" rx="35" ry="6" fill="rgba(0,0,0,0.3)"/>

      <!-- 3D Jump Rope Ellipse -->
      <ellipse class="rope-3d-spin" cx="140" cy="115" rx="65" ry="72" fill="none" stroke="url(#ropeGold)" stroke-width="2.5" stroke-dasharray="140 20"/>

      <!-- Bouncing Athlete -->
      <g class="skip-bouncer">
        <!-- Head -->
        <ellipse cx="140" cy="42" rx="11" ry="13" fill="url(#skinSkip)"/>
        <!-- Torso -->
        <path d="M 132 60 Q 140 55 148 60 L 145 105 L 135 105 Z" fill="url(#skinSkip)"/>
        <!-- Shorts -->
        <path d="M 130 102 L 150 102 L 152 128 L 128 128 Z" fill="#123088"/>

        <!-- Arms holding handles -->
        <path d="M 132 68 L 115 95 L 98 108" fill="none" stroke="url(#skinSkip)" stroke-width="8" stroke-linecap="round"/>
        <path d="M 148 68 L 165 95 L 182 108" fill="none" stroke="url(#skinSkip)" stroke-width="8" stroke-linecap="round"/>
        <rect x="92" y="104" width="8" height="14" rx="2" fill="#cba153"/>
        <rect x="180" y="104" width="8" height="14" rx="2" fill="#cba153"/>

        <!-- Springy Legs (pointing toes) -->
        <path d="M 135 125 L 133 162 L 136 174" fill="none" stroke="url(#skinSkip)" stroke-width="11" stroke-linecap="round"/>
        <path d="M 145 125 L 147 162 L 144 174" fill="none" stroke="url(#skinSkip)" stroke-width="11" stroke-linecap="round"/>
        <!-- Calves active glow -->
        <circle cx="132" cy="152" r="5" fill="#cba153"/>
        <circle cx="148" cy="152" r="5" fill="#cba153"/>
      </g>
    </svg>
  `,

  // 9. Hammer Curls (3D Bicep Squeeze)
  hammer_curls: `
    <svg viewBox="0 0 280 200" class="ex-3d-svg">
      <defs>
        <linearGradient id="skinHc" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fee3cc" />
          <stop offset="100%" stop-color="#df9262" />
        </linearGradient>
      </defs>

      <style>
        .curl-forearm {
          animation: curlLoop calc(2.6s * var(--anim-rate, 1)) ease-in-out infinite;
          transform-origin: 125px 105px;
        }
        @keyframes curlLoop {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-105deg); }
        }
        .bicep-peak {
          animation: bicepGlow calc(2.6s * var(--anim-rate, 1)) infinite;
        }
        @keyframes bicepGlow {
          0%, 100% { opacity: 0.15; }
          45%, 55% { opacity: 0.95; filter: drop-shadow(0 0 6px #cba153); }
        }
      </style>

      <line x1="30" y1="180" x2="250" y2="180" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>

      <path d="M 134 120 L 132 178" stroke="url(#skinHc)" stroke-width="13" stroke-linecap="round"/>
      <path d="M 146 120 L 148 178" stroke="url(#skinHc)" stroke-width="13" stroke-linecap="round"/>
      <rect x="127" y="105" width="26" height="30" rx="3" fill="#123088"/>

      <path d="M 130 65 Q 140 60 150 65 L 147 110 L 133 110 Z" fill="url(#skinHc)"/>
      <ellipse cx="140" cy="46" rx="11" ry="13" fill="url(#skinHc)"/>

      <!-- Upper arm pinned -->
      <path d="M 127 68 L 125 105" stroke="url(#skinHc)" stroke-width="11" stroke-linecap="round"/>
      <circle class="bicep-peak" cx="123" cy="90" r="7" fill="#cba153"/>

      <!-- Animated Curled Forearm with Neutral Grip Dumbbell -->
      <g class="curl-forearm">
        <path d="M 125 105 L 125 142" stroke="url(#skinHc)" stroke-width="9" stroke-linecap="round"/>
        <!-- Vertical Dumbbell -->
        <rect x="121" y="132" width="8" height="24" rx="2" fill="#22d3ee"/>
        <rect x="117" y="130" width="16" height="5" rx="1" fill="#0891b2"/>
        <rect x="117" y="151" width="16" height="5" rx="1" fill="#0891b2"/>
      </g>
    </svg>
  `,

  // 10. Arnold Press (3D Rotating Overhead Arc)
  arnold_press: `
    <svg viewBox="0 0 280 200" class="ex-3d-svg">
      <defs>
        <linearGradient id="skinAp" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fee3cc" />
          <stop offset="100%" stop-color="#df9262" />
        </linearGradient>
      </defs>

      <style>
        .press-rotator {
          animation: arnoldPressCycle calc(3.2s * var(--anim-rate, 1)) ease-in-out infinite;
          transform-origin: 140px 100px;
        }
        @keyframes arnoldPressCycle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-38px); }
        }
      </style>

      <line x1="30" y1="180" x2="250" y2="180" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>

      <path d="M 134 120 L 132 178" stroke="url(#skinAp)" stroke-width="13" stroke-linecap="round"/>
      <path d="M 146 120 L 148 178" stroke="url(#skinAp)" stroke-width="13" stroke-linecap="round"/>
      <rect x="127" y="105" width="26" height="30" rx="3" fill="#123088"/>

      <path d="M 130 65 Q 140 60 150 65 L 147 110 L 133 110 Z" fill="url(#skinAp)"/>
      <ellipse cx="140" cy="46" rx="11" ry="13" fill="url(#skinAp)"/>

      <!-- Animated Pressing Arms with Rotation -->
      <g class="press-rotator">
        <path d="M 125 65 L 110 80 L 112 100" fill="none" stroke="url(#skinAp)" stroke-width="9" stroke-linecap="round"/>
        <path d="M 155 65 L 170 80 L 168 100" fill="none" stroke="url(#skinAp)" stroke-width="9" stroke-linecap="round"/>

        <rect x="104" y="96" width="16" height="8" rx="2" fill="#22d3ee"/>
        <rect x="160" y="96" width="16" height="8" rx="2" fill="#22d3ee"/>
      </g>
    </svg>
  `,

  // 11. Side Plank (3D Oblique & Core Stability)
  side_plank: `
    <svg viewBox="0 0 280 200" class="ex-3d-svg">
      <defs>
        <linearGradient id="skinSp" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fee3cc" />
          <stop offset="50%" stop-color="#f5ba90" />
          <stop offset="100%" stop-color="#df9262" />
        </linearGradient>
        <linearGradient id="shortsSp" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2554d7" />
          <stop offset="100%" stop-color="#0a1a44" />
        </linearGradient>
      </defs>

      <style>
        .side-plank-body {
          animation: sidePlankPulse calc(2.8s * var(--anim-rate, 1)) ease-in-out infinite;
          transform-origin: 90px 165px;
        }
        @keyframes sidePlankPulse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .oblique-glow {
          animation: obPulse calc(2.8s * var(--anim-rate, 1)) infinite;
        }
        @keyframes obPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; filter: drop-shadow(0 0 7px #cba153); }
        }
      </style>

      <!-- Floor & Mat -->
      <line x1="30" y1="170" x2="250" y2="170" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>
      <rect x="70" y="166" width="60" height="6" rx="2" fill="#2d3748"/>

      <!-- Stacked Feet grounded on floor -->
      <ellipse cx="205" cy="165" rx="14" ry="5" fill="#df9262"/>

      <g class="side-plank-body">
        <!-- Grounded Forearm & Elbow -->
        <path d="M 95 168 L 95 130" stroke="url(#skinSp)" stroke-width="11" stroke-linecap="round"/>
        <path d="M 95 168 L 120 168" stroke="url(#skinSp)" stroke-width="8" stroke-linecap="round"/>

        <!-- Diagonal Straight Legs -->
        <path d="M 205 163 L 155 125" stroke="url(#skinSp)" stroke-width="15" stroke-linecap="round"/>

        <!-- Shorts -->
        <path d="M 142 110 L 165 125 L 152 142 L 132 128 Z" fill="url(#shortsSp)"/>

        <!-- Straight Diagonal Torso -->
        <path d="M 145 115 L 95 125" stroke="url(#skinSp)" stroke-width="16" stroke-linecap="round"/>

        <!-- Oblique Tension Glow -->
        <path class="oblique-glow" d="M 105 133 L 140 126" stroke="#cba153" stroke-width="7" stroke-linecap="round"/>

        <!-- Head / Neck aligned with spine -->
        <ellipse cx="80" cy="120" rx="10" ry="12" fill="url(#skinSp)"/>

        <!-- Top Arm reaching straight up to ceiling -->
        <path d="M 102 115 L 102 65" stroke="url(#skinSp)" stroke-width="9" stroke-linecap="round"/>
        <circle cx="102" cy="62" r="4.5" fill="#df9262"/>
      </g>

      <g transform="translate(30, 25)">
        <rect width="80" height="20" rx="4" fill="rgba(203,161,83,0.15)" stroke="#cba153" stroke-width="1"/>
        <text x="40" y="14" fill="#cba153" font-size="9" font-weight="800" text-anchor="middle">STACK HIPS</text>
      </g>
    </svg>
  `,

  // 12. Glute Bridge (3D Pelvic Thrust & Peak Contraction)
  glute_bridge: `
    <svg viewBox="0 0 280 200" class="ex-3d-svg">
      <defs>
        <linearGradient id="skinGb" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fee3cc" />
          <stop offset="100%" stop-color="#df9262" />
        </linearGradient>
      </defs>

      <style>
        .bridge-mover {
          animation: bridgeCycle calc(3s * var(--anim-rate, 1)) cubic-bezier(0.4, 0, 0.2, 1) infinite;
          transform-origin: 75px 165px;
        }
        @keyframes bridgeCycle {
          0%, 100% { transform: translateY(0); }
          40% { transform: translateY(-26px); }
          60% { transform: translateY(-26px); }
          85% { transform: translateY(0); }
        }
        .glute-glow {
          animation: glutePulse calc(3s * var(--anim-rate, 1)) infinite;
        }
        @keyframes glutePulse {
          0%, 100% { opacity: 0.15; }
          40%, 65% { opacity: 1; filter: drop-shadow(0 0 8px #cba153); }
        }
      </style>

      <!-- Floor -->
      <line x1="30" y1="168" x2="250" y2="168" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>

      <!-- Upper Back & Head flat on ground -->
      <ellipse cx="65" cy="160" rx="10" ry="10" fill="url(#skinGb)"/>
      <path d="M 72 162 L 95 162" stroke="url(#skinGb)" stroke-width="14" stroke-linecap="round"/>

      <!-- Bent Knees / Feet Flat -->
      <path d="M 195 168 L 180 130" stroke="url(#skinGb)" stroke-width="14" stroke-linecap="round"/>
      <ellipse cx="196" cy="168" rx="12" ry="4" fill="#df9262"/>

      <!-- Animated Pelvis, Glutes, and Thighs -->
      <g class="bridge-mover">
        <!-- Torso rising diagonally -->
        <path d="M 95 162 L 140 145" stroke="url(#skinGb)" stroke-width="16" stroke-linecap="round"/>
        <!-- Shorts / Pelvis -->
        <rect x="130" y="135" width="28" height="22" rx="4" fill="#123088"/>
        <!-- Thigh from pelvis to knee -->
        <path d="M 148 142 L 180 130" stroke="url(#skinGb)" stroke-width="15" stroke-linecap="round"/>
        <!-- Glute Squeeze Glow -->
        <circle class="glute-glow" cx="138" cy="148" r="9" fill="#cba153"/>
      </g>

      <!-- Arms resting by sides on mat -->
      <path d="M 80 165 L 130 165" stroke="url(#skinGb)" stroke-width="8" stroke-linecap="round"/>

      <g transform="translate(30, 30)">
        <rect width="85" height="20" rx="4" fill="rgba(203,161,83,0.15)" stroke="#cba153" stroke-width="1"/>
        <text x="42" y="14" fill="#cba153" font-size="9" font-weight="800" text-anchor="middle">2s GLUTE SQUEEZE</text>
      </g>
    </svg>
  `,

  // 13. Bird Dogs (3D Tabletop Core Stabilization)
  bird_dogs: `
    <svg viewBox="0 0 280 200" class="ex-3d-svg">
      <defs>
        <linearGradient id="skinBd" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fee3cc" />
          <stop offset="100%" stop-color="#df9262" />
        </linearGradient>
      </defs>

      <style>
        .bird-arm-reach {
          animation: birdArmAnim calc(3.4s * var(--anim-rate, 1)) ease-in-out infinite;
          transform-origin: 105px 125px;
        }
        .bird-leg-reach {
          animation: birdLegAnim calc(3.4s * var(--anim-rate, 1)) ease-in-out infinite;
          transform-origin: 175px 125px;
        }
        @keyframes birdArmAnim {
          0%, 100% { transform: rotate(0deg); }
          45%, 55% { transform: rotate(-80deg); }
        }
        @keyframes birdLegAnim {
          0%, 100% { transform: rotate(0deg); }
          45%, 55% { transform: rotate(80deg); }
        }
        .spine-brace {
          animation: spinePulse calc(3.4s * var(--anim-rate, 1)) infinite;
        }
        @keyframes spinePulse {
          0%, 100% { opacity: 0.2; }
          45%, 55% { opacity: 0.95; filter: drop-shadow(0 0 6px #cba153); }
        }
      </style>

      <line x1="30" y1="170" x2="250" y2="170" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>

      <!-- Grounded Knee and Hand (Tabletop) -->
      <path d="M 115 125 L 115 168" stroke="url(#skinBd)" stroke-width="10" stroke-linecap="round"/>
      <ellipse cx="115" cy="168" rx="6" ry="3" fill="#df9262"/>
      <path d="M 165 125 L 165 168" stroke="url(#skinBd)" stroke-width="12" stroke-linecap="round"/>
      <ellipse cx="165" cy="168" rx="8" ry="4" fill="#df9262"/>

      <!-- Flat Tabletop Spine Torso -->
      <path d="M 105 122 L 180 122" stroke="url(#skinBd)" stroke-width="16" stroke-linecap="round"/>
      <path class="spine-brace" d="M 115 118 L 170 118" stroke="#cba153" stroke-width="6" stroke-linecap="round"/>
      <ellipse cx="92" cy="122" rx="10" ry="11" fill="url(#skinBd)"/>
      <rect x="160" y="112" width="22" height="18" rx="3" fill="#123088"/>

      <!-- Dynamic Reaching Arm -->
      <g class="bird-arm-reach">
        <path d="M 105 125 L 105 165" stroke="url(#skinBd)" stroke-width="9" stroke-linecap="round"/>
      </g>

      <!-- Dynamic Reaching Leg -->
      <g class="bird-leg-reach">
        <path d="M 175 125 L 175 165" stroke="url(#skinBd)" stroke-width="12" stroke-linecap="round"/>
      </g>

      <g transform="translate(30, 25)">
        <rect width="85" height="20" rx="4" fill="rgba(203,161,83,0.15)" stroke="#cba153" stroke-width="1"/>
        <text x="42" y="14" fill="#cba153" font-size="9" font-weight="800" text-anchor="middle">HIPS LEVEL • 2s PAUSE</text>
      </g>
    </svg>
  `,

  // 14. Mike Tyson Push-ups (3D Backward Coil & Exploding Drive)
  mike_tyson_pushups: `
    <svg viewBox="0 0 280 200" class="ex-3d-svg">
      <defs>
        <linearGradient id="skinMt" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fee3cc" />
          <stop offset="100%" stop-color="#df9262" />
        </linearGradient>
      </defs>

      <style>
        .tyson-spring {
          animation: tysonCycle calc(3s * var(--anim-rate, 1)) cubic-bezier(0.4, 0, 0.2, 1) infinite;
          transform-origin: 220px 155px;
        }
        @keyframes tysonCycle {
          0%, 100% { transform: translateX(0); }
          45% { transform: translateX(35px); }
          55% { transform: translateX(35px); }
          85% { transform: translateX(-10px); }
        }
      </style>

      <line x1="30" y1="168" x2="250" y2="168" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>
      <!-- Wall / Baseboard on right -->
      <line x1="240" y1="110" x2="240" y2="168" stroke="#4b5563" stroke-width="4"/>

      <!-- Dynamic Coiling Body -->
      <g class="tyson-spring">
        <!-- Feet planted back against wall/floor -->
        <ellipse cx="230" cy="162" rx="8" ry="6" fill="#df9262"/>

        <!-- Legs coiled like springs -->
        <path d="M 230 162 L 195 140 L 165 145" fill="none" stroke="url(#skinMt)" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="155" y="135" width="22" height="18" rx="3" fill="#123088"/>

        <!-- Torso & Head -->
        <path d="M 160 142 L 105 145" stroke="url(#skinMt)" stroke-width="15" stroke-linecap="round"/>
        <ellipse cx="92" cy="145" rx="10" ry="11" fill="url(#skinMt)"/>

        <!-- Hands on floor in pushup stance -->
        <path d="M 105 145 L 115 168" stroke="url(#skinMt)" stroke-width="10" stroke-linecap="round"/>
        <ellipse cx="115" cy="168" rx="6" ry="3" fill="#df9262"/>
      </g>

      <g transform="translate(30, 25)">
        <rect width="90" height="20" rx="4" fill="rgba(203,161,83,0.15)" stroke="#cba153" stroke-width="1"/>
        <text x="45" y="14" fill="#cba153" font-size="9" font-weight="800" text-anchor="middle">COIL & EXPLODE</text>
      </g>
    </svg>
  `,

  // 15. 90/90 Hip Switches & Mobility
  hip_switches_9090: `
    <svg viewBox="0 0 280 200" class="ex-3d-svg">
      <defs>
        <linearGradient id="skin90" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fee3cc" />
          <stop offset="100%" stop-color="#df9262" />
        </linearGradient>
      </defs>

      <style>
        .hip-sway {
          animation: hip90Loop calc(3.6s * var(--anim-rate, 1)) ease-in-out infinite;
          transform-origin: 140px 140px;
        }
        @keyframes hip90Loop {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(8deg); }
        }
      </style>

      <line x1="30" y1="170" x2="250" y2="170" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>

      <g class="hip-sway">
        <!-- Seated Base on Floor -->
        <rect x="125" y="130" width="30" height="25" rx="4" fill="#123088"/>

        <!-- Upright Tall Torso (No hands) -->
        <path d="M 140 135 L 140 80" stroke="url(#skin90)" stroke-width="16" stroke-linecap="round"/>
        <ellipse cx="140" cy="65" rx="11" ry="13" fill="url(#skin90)"/>

        <!-- Arms crossed or held out in front for balance -->
        <path d="M 132 85 Q 140 98 148 85" fill="none" stroke="url(#skin90)" stroke-width="9" stroke-linecap="round"/>

        <!-- 90/90 Bent Legs flat on mat -->
        <path d="M 130 148 L 95 155 L 85 168" fill="none" stroke="url(#skin90)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M 150 148 L 185 155 L 195 168" fill="none" stroke="url(#skin90)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
      </g>

      <g transform="translate(30, 25)">
        <rect width="80" height="20" rx="4" fill="rgba(203,161,83,0.15)" stroke="#cba153" stroke-width="1"/>
        <text x="40" y="14" fill="#cba153" font-size="9" font-weight="800" text-anchor="middle">SIT TALL • NO HANDS</text>
      </g>
    </svg>
  `
};

// Aliases and Fallbacks ensuring all 34 exercises have dynamic representations
window.EXERCISE_ILLUSTRATIONS.close_grip_press = window.EXERCISE_ILLUSTRATIONS.floor_press;
window.EXERCISE_ILLUSTRATIONS.gorilla_rows = window.EXERCISE_ILLUSTRATIONS.bent_over_row;
window.EXERCISE_ILLUSTRATIONS.renegade_rows = window.EXERCISE_ILLUSTRATIONS.bent_over_row;
window.EXERCISE_ILLUSTRATIONS.upright_row = window.EXERCISE_ILLUSTRATIONS.lateral_raise;
window.EXERCISE_ILLUSTRATIONS.single_leg_rdl = window.EXERCISE_ILLUSTRATIONS.romanian_deadlift;
window.EXERCISE_ILLUSTRATIONS.glute_bridge = window.EXERCISE_ILLUSTRATIONS.glute_bridge;
window.EXERCISE_ILLUSTRATIONS.rear_delt_fly = window.EXERCISE_ILLUSTRATIONS.lateral_raise;
window.EXERCISE_ILLUSTRATIONS.jump_squats = window.EXERCISE_ILLUSTRATIONS.goblet_squat;
window.EXERCISE_ILLUSTRATIONS.reverse_crunches = window.EXERCISE_ILLUSTRATIONS.dead_bugs;
window.EXERCISE_ILLUSTRATIONS.side_plank = window.EXERCISE_ILLUSTRATIONS.side_plank;
window.EXERCISE_ILLUSTRATIONS.pallof_press = window.EXERCISE_ILLUSTRATIONS.hammer_curls;
window.EXERCISE_ILLUSTRATIONS.plank_to_pushup = window.EXERCISE_ILLUSTRATIONS.mike_tyson_pushups;
window.EXERCISE_ILLUSTRATIONS.lying_leg_raises = window.EXERCISE_ILLUSTRATIONS.dead_bugs;
window.EXERCISE_ILLUSTRATIONS.suitcase_hold = window.EXERCISE_ILLUSTRATIONS.hammer_curls;
window.EXERCISE_ILLUSTRATIONS.bird_dogs = window.EXERCISE_ILLUSTRATIONS.bird_dogs;
window.EXERCISE_ILLUSTRATIONS.diaphragmatic_breathing = window.EXERCISE_ILLUSTRATIONS.dead_bugs;
window.EXERCISE_ILLUSTRATIONS.slow_kegels = window.EXERCISE_ILLUSTRATIONS.glute_bridge;
window.EXERCISE_ILLUSTRATIONS.quick_flicks = window.EXERCISE_ILLUSTRATIONS.glute_bridge;
window.EXERCISE_ILLUSTRATIONS.deep_squat_breathing = window.EXERCISE_ILLUSTRATIONS.goblet_squat;
window.EXERCISE_ILLUSTRATIONS.hip_switches_9090 = window.EXERCISE_ILLUSTRATIONS.hip_switches_9090;
window.EXERCISE_ILLUSTRATIONS.worlds_greatest_stretch = window.EXERCISE_ILLUSTRATIONS.bulgarian_split_squat;
window.EXERCISE_ILLUSTRATIONS.leg_swings = window.EXERCISE_ILLUSTRATIONS.romanian_deadlift;
window.EXERCISE_ILLUSTRATIONS.deep_squat_hold = window.EXERCISE_ILLUSTRATIONS.goblet_squat;
window.EXERCISE_ILLUSTRATIONS.mike_tyson_pushups = window.EXERCISE_ILLUSTRATIONS.mike_tyson_pushups;
