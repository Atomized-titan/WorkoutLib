const PORT = 8080;
const express = require("express");
const app = express();
const axios = require("axios");

const bodyParts = [
  "chest",
  "back",
  "shoulders",
  "upper legs",
  "lower legs",
  "upper arms",
  "lower arms",
  "abs",
  "cardio",
];


const targetMusclesDetails = [
  {
    chest: [
      {
        name: "Pectoralis Major",
        description:
          "The pectoralis major is a thick, fan-shaped or triangular convergent muscle, situated at the chest of the human body. It makes up the bulk of the chest muscles and lies under the breast. Beneath the pectoralis major is the pectoralis minor, a thin, triangular muscle.",
      },
      {
        name: "Pectoralis Minor",
        description:
          "The pectoralis minor is a thin, triangular muscle, located at the chest of the human body. It makes up the bulk of the chest muscles and lies under the breast. Beneath the pectoralis minor is the pectoralis major, a thick, fan-shaped or triangular convergent muscle.",
      },
      {
        name: "Serratus Anterior",
        description:
          "The serratus anterior is a muscle that originates on the surface of the 1st to 8th ribs at the side of the chest and inserts along the entire anterior length of the medial border of the scapula. The serratus anterior acts to pull the scapula forward around the thorax.",
      },
      {
        name: "subclavius",
        description:
          "The subclavius is a small triangular muscle, placed between the clavicle and the first rib. Along with the pectoralis major and pectoralis minor muscles, the subclavius muscle makes up the anterior axioappendicular muscles, also known as anterior wall of the axilla.",
      },
    ],
  },
  {
    back: [
      {
        name: "Latissimus Dorsi",
        description:
          "The latissimus dorsi is the largest muscle in the upper body. The latissimus dorsi is responsible for extension, adduction, transverse extension also known as horizontal abduction (or horizontal extension), flexion from an extended position, and (medial) internal rotation of the shoulder joint.",
      },
      {
        name: "Trapezius",
        description:
          "The trapezius is a muscle that starts at the base of your neck, goes across your shoulders and extends to the middle of your back. The trapezius (traps muscle) helps you move your head, neck, arms, shoulders and torso. It also stabilizes your spine and helps with posture.",
      },
      {
        name: "Rhomboids",
        description:
          "The rhomboid muscles often simply called the rhomboids, are rhombus-shaped muscles associated with the scapula. There are two rhomboid muscles on each side of the upper back.",
      },
      {
        name: "erector spinae",
        description:
          "The erector spinae is not just one muscle, but a group of muscles and tendons which run more or less the length of the spine on the left and the right, from the sacrum, or sacral region, and hips to the base of the skull.",
      },
    ],
  },
  {
    shoulders: [
      {
        name: "Trapezius",
        description:
          "Shaped like a triangle (hence the name), these shoulder muscles run down the spine and across the shoulder blade, supporting your arm and shoulder when you raise it. You have a trapezius muscle on both your left and right side.",
      },
      {
        name: "Latissimus Dorsi",
        description:
          "The latissimus dorsi is the largest muscle in the upper body. The latissimus dorsi is responsible for extension, adduction, transverse extension also known as horizontal abduction (or horizontal extension), flexion from an extended position, and (medial) internal rotation of the shoulder joint.",
      },
      {
        name: "Rhomboids",
        description:
          "These rhombus-shaped muscles are primarily responsible for the retraction of the scapula. They're located in the middle of your shoulder blades on your upper back, and divided between left and right.",
      },
      {
        name: "Levator Scapulae",
        description:
          "As its name suggests, the levator scapulae muscle helps lift the scapula bone (shoulder bone), which connects the humerus (upper arm bone) and clavicle (collarbone).",
      },
      {
        name: "Rotator cuff",
        description:
          "The rotator cuff muscles are a collection of four components. The function of rotator cuff muscles is to support articulation between your arm and shoulder.",
      },
      {
        name: "deltoids",
        description:
          "The deltoids are a set of three muscles. These thin layers of tissue connect your shoulder to your chest. You’ll find the anterior deltoid between your chest and shoulder, your lateral deltoid on top of your shoulder, as well as your posterior deltoid between your upper arm and shoulder blades.",
      },
    ],
  },
  {
    abs: [
      {
        name: "external obliques",
        description:
          "The external obliques are a pair of muscles, one on each side of the rectus abdominis. They are the largest of the flat muscles and at the bottom of the stack. They run from the sides of your body toward the middle. The external obliques allow the trunk to twist side to side.",
      },
      {
        name: "internal obliques",
        description:
          "The internal obliques are a pair of muscles on top of the external obliques, just inside your hip bones. Like the external obliques, they are on the sides of the rectus abdominis, running from the sides of your trunk toward the middle. They work with the external oblique muscles to allow the trunk to twist and turn.",
      },
      {
        name: "transversus abdominis",
        description:
          "The transversus abdominis is at the bottom of the stack. This pair of muscles is the deepest of the flat muscles. They stabilize the trunk and help maintain internal abdominal pressure.",
      },
      {
        name: "rectus abdominis",
        description:
          "This pair of muscles goes down the middle of your abdomen from your ribs to the front of your pelvis. The muscles hold your internal organs in place and keep your body stable during movement. The rectus abdominis may form bumps sometimes called a “six-pack” when someone has a trim, fit abdomen.",
      },
      {
        name: "Pyramidalis",
        description:
          "This vertical muscle is small and shaped like a triangle. It’s located very low, in your pelvis. It helps maintain internal pressure in your abdomen.",
      },
    ],
  },
];

// "calves",
// "hamstrings",
// "quadriceps",
// "glutes",
// "biceps",
// "triceps",
// "forearms",
// "trapezius",
// "latissmus dorsi",

const exercises = [
  {
    bodypart: "chest",
    name: "Barbell Bench Press",
    targets:["pectoralis major", "deltoids", "triceps", "deltoids"],
    description:"Grasp the bar just outside shoulder-width and arch your back so there's space between your lower back and the bench.Pull the bar out of the rack and lower it to your sternum, tucking your elbows about 45° to your sides. When the bar touches your body, drive your feet hard into the floor and press the bar back up.",
    equipment: "barbell",
    gifUrl:"http://newlife.com.cy/wp-content/uploads/2019/11/00331301-Barbell-Decline-Bench-Press_Chest_360.gif"
  },
];

const equipments = [
  {
    id: 001,
    name: "barbell",
  },
  {
    id: 002,
    name: "dumbbell",
  },
  {
    id: 003,
    name: "Kettlebell",
  },
  {
    id: 004,
    name: "elliptical machine",
  },
  {
    id: 005,
    name: "abdominal bench",
  },
  {
    id: 006,
    name: "cable machine",
  },
  {
    id: 007,
    name: "body weight",
  },
  {
    id: 008,
    name: "roller wheel",
  },
  {
    id: 009,
    name: "stability ball",
  },
  {
    id: 010,
    name: "treadmill",
  },
  {
    id: 011,
    name: "battle ropes",
  },
  {
    id: 012,
    name: "foam roller",
  },
  {
    id: 013,
    name: "blocks",
  },
  {
    id: 014,
    name: "climbing rope",
  },
  {
    id: 015,
    name: "handgrip exerciser",
  },
  {
    id: 016,
    name: "jump rope",
  },
  {
    id: 017,
    name: "curl bar",
  },
  {
    id: 018,
    name: "wooden balancing board",
  },
  {
    id: 019,
    name: "dragging sled",
  },
  {
    id: 020,
    name: "ez curl bar",
  },
  {
    id: 021,
    name: "pull up bar",
  },
  {
    id: 022,
    name: "push up bar",
  },
  {
    id: 023,
    name: "dipping bars",
  },
  {
    id: 024,
    name: "tricep bar",
  },
  {
    id: 025,
    name: "bench press",
  },
  {
    id: 026,
    name: "flat bench",
  },
  {
    id: 027,
    name: "hyperextension bench",
  },
  {
    id: 028,
    name: "incline/decline bench",
  },
  {
    id: 029,
    name: "preacher bench",
  },
  {
    id: 030,
    name: "roman chair",
  },
  {
    id: 031,
    name: "air resistance exercise bike",
  },
  {
    id: 032,
    name: "maxi climber",
  },
  {
    id: 033,
    name: "mini exercise bike",
  },
  {
    id: 034,
    name: "recumbent bike",
  },
  {
    id: 035,
    name: "rowing machine",
  },
  {
    id: 036,
    name: "stair climber",
  },
  {
    id: 037,
    name: "stair stepper",
  },
  {
    id: 038,
    name: "cable crossover machine",
  },
  {
    id: 039,
    name: "cable pulley machine",
  },
  {
    id: 040,
    name: "cablf raise machine",
  },
  {
    id: 041,
    name: "glute ham developer",
  },
  {
    id: 042,
    name: "leg abduction/adduction machine",
  },
  {
    id: 043,
    name: "leg/hamstring curl machine",
  },
  {
    id: 044,
    name: "leg extension machine",
  },
  {
    id: 045,
    name: "leg press machine",
  },
  {
    id: 046,
    name: "resistance bands",
  },
  {
    id: 047,
    name: "chest press machine",
  },
  {
    id: 048,
    name: "hammer strength machine",
  },
  {
    id: 049,
    name: "lat pulldown machine",
  },
  {
    id: 050,
    name: "medicine ball",
  },
  {
    id: 051,
    name: "pec fly machine",
  },
  {
    id: 052,
    name: "pec deck machine",
  },
  {
    id: 053,
    name: "pull up bar",
  },
  {
    id: 054,
    name: "punching bag",
  },
  {
    id: 055,
    name: "hack squat machine",
  },
  {
    id: 056,
    name: "squat rack",
  },
  {
    id: 057,
    name: "smith machine",
  },
];

app.use(express.static("public"));

// list of body parts

app.get("/api/bodyparts", (req, res) => {
  res.send(bodyParts);
});

// List of all Exercises

app.get("/api/exercises", (req, res) => {
  res.send(exercises);
});

// exercise by ID

app.get("/api/exercises/:id", (req, res) => {
  const exercise = exercises.find((e) => e.id === +req.params.id);
  if (exercise) {
    res.send(exercise);
  } else {
    res.sendStatus(404);
  }
});

// list of specific body parts

app.get("/api/targetMusclesDetails", (req, res) => {
  res.send(targetMusclesDetails);
});
// list of eqipments

app.get("/api/equipment", (req, res) => {
  res.send(equipments);
});

// equipments by ID

app.get("/api/equipment/:id", (req, res) => {
  const eqipments = equipments.find((e) => e.id === +req.params.id);
  if (eqipments) {
    res.send(eqipments);
  } else {
    res.sendStatus(404);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
