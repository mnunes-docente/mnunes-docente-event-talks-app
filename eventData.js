const talks = [
  {
    id: 'talk1',
    title: 'Introduction to WebAssembly',
    speakers: ['Alice Smith'],
    categories: ['Web Development', 'Performance'],
    duration: 60,
    description: 'A deep dive into WebAssembly and its potential for high-performance web applications.'
  },
  {
    id: 'talk2',
    title: 'Modern CSS Techniques',
    speakers: ['Bob Johnson'],
    categories: ['Web Design', 'CSS'],
    duration: 60,
    description: 'Explore the latest and most effective techniques for styling web interfaces with modern CSS.'
  },
  {
    id: 'talk3',
    title: 'State Management in React',
    speakers: ['Charlie Brown', 'Diana Prince'],
    categories: ['Frontend', 'React', 'JavaScript'],
    duration: 60,
    description: 'Understanding different state management patterns and libraries in React applications.'
  },
  {
    id: 'talk4',
    title: 'Building Scalable Node.js APIs',
    speakers: ['Eve Adams'],
    categories: ['Backend', 'Node.js', 'API'],
    duration: 60,
    description: 'Best practices for designing and building robust, scalable APIs with Node.js.'
  },
  {
    id: 'talk5',
    title: 'Introduction to Machine Learning on GCP',
    speakers: ['Frank White'],
    categories: ['Cloud', 'Machine Learning', 'GCP'],
    duration: 60,
    description: 'An overview of Google Cloud Platform services for machine learning workflows.'
  },
  {
    id: 'talk6',
    title: 'Containerization with Docker and Kubernetes',
    speakers: ['Grace Kelly'],
    categories: ['DevOps', 'Containers', 'Kubernetes'],
    duration: 60,
    description: 'Learn the fundamentals of Docker and Kubernetes for deploying and managing applications.'
  }
];

const lunchBreak = {
  id: 'lunch',
  name: 'Lunch Break',
  duration: 60
};

function generateSchedule(startTimeHour, startTimeMinute, talks, lunchBreak) {
  const schedule = [];
  let currentTime = new Date(2026, 6, 27, startTimeHour, startTimeMinute); // Set a dummy date for calculation

  talks.forEach((talk, index) => {
    // Add talk
    schedule.push({
      type: 'talk',
      ...talk,
      startTime: new Date(currentTime),
      endTime: new Date(currentTime.getTime() + talk.duration * 60 * 1000)
    });
    currentTime.setMinutes(currentTime.getMinutes() + talk.duration);

    // Add 10-minute transition, unless it's the last talk or just before lunch
    if (index < talks.length - 1 && !(index === Math.floor(talks.length / 2) -1)) { // Assuming lunch is in the middle
      currentTime.setMinutes(currentTime.getMinutes() + 10);
    }
  });

  // Insert lunch break in the middle, assuming 6 talks, after 3rd talk
  const lunchInsertIndex = Math.floor(talks.length / 2);
  const talkBeforeLunchEndTime = schedule[lunchInsertIndex - 1].endTime;
  const talkAfterLunchStartTime = schedule[lunchInsertIndex].startTime;

  lunchBreak.startTime = new Date(talkBeforeLunchEndTime);
  lunchBreak.endTime = new Date(talkBeforeLunchEndTime.getTime() + lunchBreak.duration * 60 * 1000);

  // Adjust start time of talks after lunch
  const timeDifferenceAfterLunch = lunchBreak.endTime.getTime() - talkAfterLunchStartTime.getTime();
  for (let i = lunchInsertIndex; i < schedule.length; i++) {
    schedule[i].startTime.setTime(schedule[i].startTime.getTime() + timeDifferenceAfterLunch);
    schedule[i].endTime.setTime(schedule[i].endTime.getTime() + timeDifferenceAfterLunch);
  }

  schedule.splice(lunchInsertIndex, 0, { type: 'break', ...lunchBreak });


  return schedule;
}

const eventSchedule = generateSchedule(10, 0, talks, lunchBreak);

module.exports = { talks, lunchBreak, eventSchedule };
