import { useEffect, useMemo, useRef, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";

const BRAND_NAME = "Horizon Chess";
const ZELLE_EMAIL = "horizonchess@yahoo.com";
const DEFAULT_SUBJECT = "Horizon Chess Academy lesson request";
const CONSULTATION_STORAGE_KEY = "horizon-consultation-email-captured";

const PAGES = [
  { key: "home", label: "Home" },
  { key: "blog", label: "Blog" },
  { key: "success-stories", label: "Success Stories" },
  { key: "coach-chris", label: "Coach Chris" },
];

const SOCIAL_LINKS = [
  { label: "YouTube", href: "https://www.youtube.com/horizonchess", icon: "youtube" },
  { label: "Instagram", href: "https://www.instagram.com/horizonchess/", icon: "instagram" },
];

const ROUTABLE_PAGES = [...PAGES, { key: "book" }];

const SLIDES = [
  "/images/coach-classroom-1.jpg",
  "/images/slide1.jpg",
  "/images/coach-classroom-2.jpg",
  "/images/slide2.jpg",
  "/images/students-cafeteria-chess.webp",
  "/images/student-smiling-chess-board.jpg",
];

const LESSONS = [
  {
    key: "online-beginner",
    eyebrow: "First steps",
    title: "Online Beginner Lesson",
    format: "60 minutes online",
    price: "$85",
    koalendarUrl: "https://koalendar.com/e/meet-with-chris-c",
    bullets: [
      "Opening principles and healthy development habits",
      "Tactics patterns with a simple practice routine",
      "Basic endgames and a clear plan for the next week",
    ],
  },
  {
    key: "online-tournament",
    eyebrow: "Tournament track",
    title: "Online Tournament Training",
    format: "60 minutes online",
    price: "$135",
    koalendarUrl: "https://koalendar.com/e/online-tournament-training-60-minutes-dollar135",
    bullets: [
      "Opening direction matched to your playing style",
      "Calculation process and middlegame planning",
      "Annotated game review with concrete assignments",
    ],
  },
  {
    key: "inperson-beginner",
    eyebrow: "Board-side coaching",
    title: "In-Person Beginner Lesson",
    format: "60 minutes in person",
    price: "$110 total",
    koalendarUrl: "https://koalendar.com/e/in-person-beginner-lesson-60-minutes-dollar110",
    bullets: [
      "Hands-on fundamentals and board vision",
      "Confidence building through guided positions",
      "At-home practice plan for steady improvement",
    ],
  },
  {
    key: "inperson-tournament",
    eyebrow: "Competition prep",
    title: "In-Person Tournament Prep",
    format: "60 minutes in person",
    price: "$170 total",
    koalendarUrl: "https://koalendar.com/e/in-person-tournament-prep-60-minutes-dollar170",
    bullets: [
      "Tournament openings, middlegames, and endgames",
      "Candidate moves and calculation under pressure",
      "Performance habits plus post-game review",
    ],
  },
];

const METHOD_STEPS = [
  {
    number: "01",
    title: "Find the real starting point",
    body: "Every student begins with a look at current habits, recent games, rating level, and confidence at the board.",
  },
  {
    number: "02",
    title: "Build a practical roadmap",
    body: "Lessons focus on the next useful skill: tactics, openings, calculation, endgames, or tournament preparation.",
  },
  {
    number: "03",
    title: "Review, adjust, repeat",
    body: "Students leave with targeted practice and return with games or positions that reveal what should come next.",
  },
];

const ARTICLES = [
  {
    tag: "Beginner chess",
    title: "How to Build Reliable Chess Fundamentals",
    summary:
      "New players improve fastest when they learn to develop pieces, protect the king, control the center, and notice simple tactical threats before looking for flashy moves.",
    points: ["Opening principles", "Safe king habits", "Basic tactical vision"],
  },
  {
    tag: "Game review",
    title: "Turning Mistakes Into a Training Plan",
    summary:
      "A lost game is useful when the student can name the decision that caused the position to change. Coach Chris uses review to turn frustration into a short list of repeatable habits.",
    points: ["Blunder checks", "Candidate moves", "Weekly assignments"],
  },
  {
    tag: "Tournament prep",
    title: "What to Practice Before a Tournament",
    summary:
      "Tournament preparation is not just memorizing openings. Students need time controls, endgame confidence, emotional reset routines, and a plan for analyzing games after each round.",
    points: ["Opening comfort", "Clock management", "Post-game notes"],
  },
  {
    tag: "Chess confidence",
    title: "Helping Students Think Clearly Under Pressure",
    summary:
      "Confidence grows when students know what to do on their turn. A simple thinking process helps players slow down, compare options, and make decisions they can explain.",
    points: ["Checks and captures", "Threat awareness", "Calm decision making"],
  },
];

const BLOG_POSTS = [
  {
    "slug": "chess-lessons-for-life-rasheme-ellington",
    "category": "Life skills",
    "tags": ["chess lessons for life", "student resilience", "decision-making", "youth chess", "social-emotional learning"],
    "title": "Chess Lessons for Life: Resilience, Strategy, and Becoming Your Best Self",
    "metaTitle": "Chess Lessons for Life: Resilience, Strategy, and Becoming Your Best Self",
    "metaDescription": "Learn how chess lessons help students build resilience, better decision-making, emotional control, and long-term confidence on and off the board.",
    "excerpt": "Chess lessons can help students slow down, think clearly, recover from mistakes, and build confidence that carries beyond the board.",
    "author": "Coach Chris",
    "publishedDate": "2026-05-19",
    "updatedDate": "2026-05-19",
    "canonicalPath": "#/blog/chess-lessons-for-life-rasheme-ellington",
    "featuredImage": "https://i.ytimg.com/vi/EZJu25x9MWw/hqdefault.jpg",
    "imageAlt": "Rasheme Ellington TEDx thumbnail for a talk about chess lessons for life and student resilience.",
    "audience": "Parents, school leaders, chess teachers, enrichment coordinators, and educators interested in social-emotional learning.",
    "sourceNote": "Source video: How the game of chess teaches lessons for life | Rasheme Ellington | TEDxManhattanBeach, TEDx Talks, published April 4, 2025.",
    "source": "Rasheme Ellington's TEDxManhattanBeach talk",
    "videoId": "EZJu25x9MWw",
    "videoTitle": "How the game of chess teaches lessons for life | Rasheme Ellington | TEDxManhattanBeach",
    "videoUrl": "https://youtu.be/EZJu25x9MWw",
    "summaryIntro": "Coach Chris takeaway: chess gives students a calm structure for pressure. The board asks them to pause, notice what changed, and choose the next useful move.",
    "sectionHeadings": [
      { "beforeParagraph": 0, "title": "What Chess Lessons for Life Teach Students" },
      { "beforeParagraph": 3, "title": "Resilience Grows Through Mistakes" },
      { "beforeParagraph": 5, "title": "Decision-Making Improves When Students Visualize" },
      { "beforeParagraph": 10, "title": "How a Chess Classroom Turns Pressure Into Growth" },
      { "beforeParagraph": 14, "title": "Leadership, Teamwork, and Confidence on the Board" },
      { "beforeParagraph": 17, "title": "Why Parents and Schools Should Care" },
      { "beforeParagraph": 20, "title": "The Next Move Still Matters" }
    ],
    "relatedSlugs": ["chess-revolutionize-learning-cody-pomeranz", "chess-emotional-intelligence-ash-reddy", "how-to-calculate-better-in-chess"],
    "body": [
      "Rasheme Ellington's TEDxManhattanBeach talk presents chess not as a hobby, but as a turning point. What stands out to me as a chess coach is how clearly his story shows the real value of chess lessons for life: students learn to slow down, face pressure, and build a better way to think before they act.",
      "That personal frame matters because many students encounter chess at a similar crossroads, even if their circumstances look different. Some students are restless. Some are angry. Some are bored. Some are talented but undisciplined. Some are quiet and unsure of themselves. Some are used to instant gratification and have never had to sit with a difficult problem long enough to solve it. Chess meets those students with a simple but demanding message: slow down, look clearly, and choose.",
      "In Ellington's story, chess becomes a form of self-rescue. His mother saw potential in him, and his father helped introduce him to the game. That family support gave him more than instruction in how pieces move. It gave him a new framework for seeing himself. Instead of drifting through pressure, he began to study positions. Instead of reacting blindly, he began to visualize. Instead of treating setbacks as proof that he could not succeed, he learned to analyze losses and prepare for the next game.",
      "That is one of the most important lessons chess can teach: resilience is not built only through winning. In fact, winning alone can create fragile confidence. A student who wins easily may believe they are strong until they face real resistance. Chess teaches a deeper kind of confidence because the player must survive mistakes, defeats, and uncomfortable positions. A loss is painful, but it is also information. It tells the player where their thinking broke down. Did they rush? Did they ignore the opponent's plan? Did they chase material while leaving the king exposed? Did they give up too early?",
      "Those questions are useful far beyond the board. Life rarely presents perfect positions. A young person may face peer pressure, academic difficulty, family stress, financial limits, social conflict, or self-doubt. The instinct may be to escape, blame, react, or quit. Chess offers another instinct: examine the position. What are the threats? What resources remain? What is the goal? What move gives you the best chance to improve? That does not make life easy, but it makes life more navigable.",
      "The idea of visualization is central here. Before a chess player moves, they must imagine what could happen next. Beginners often see only their own idea: I can take that pawn, I can give that check, I can attack that piece. Stronger players ask what comes after. If I take the pawn, what does my opponent do? If I check, where does the king go? If I attack, what am I leaving undefended? This habit of seeing beyond the immediate moment is one of the most valuable skills a young person can develop.",
      "Ellington's talk connects that habit to personal growth. A person who does not visualize consequences can live impulsively. They may chase whatever feels good now, even if it weakens their future position. Chess trains the opposite. It teaches that the move that feels exciting may not be the move that serves the plan. It teaches that every action changes the board. It teaches that the future is not random; it is shaped by decisions made in the present.",
      "For students, that lesson can be life-changing. A teacher can say \"your choices matter\" a thousand times, but chess lets students experience it. Move a defender away and something falls. Ignore king safety and pressure builds. Push too many pawns and weak squares appear. Trade without thinking and the endgame becomes worse. The board does not yell. It simply reveals the consequences. That quiet accountability can reach students who resist traditional correction.",
      "Chess also teaches that responsibility is not the same as blame. Blame says, \"you failed.\" Responsibility says, \"you have agency.\" That difference is crucial. When students review a lost game, the goal is not to shame them for mistakes. The goal is to show them that they can make different decisions next time. Responsibility gives power back to the learner. If my move contributed to the problem, then my future thinking can contribute to the solution.",
      "This is why chess can be especially powerful for vulnerable youth. It provides structure without requiring perfection. It gives challenge without humiliation when taught well. It offers status through effort, not background. A student does not need expensive equipment, perfect grades, or social popularity to sit down and play. The board creates a space where patience, creativity, and courage matter. For a student who has not often felt in control, that can be deeply empowering.",
      "Ellington's work as a chess educator underscores that point. Teaching thousands of students is not just about spreading a game. It is about giving young people a repeatable method for handling complexity. In a chess lesson, students learn focus because the position demands attention. They learn discipline because random moves fail. They learn preparation because opponents have ideas too. They learn humility because everyone loses. They learn confidence because improvement is visible.",
      "A well-designed chess classroom can make those lessons explicit. Before a game, students can be asked to set one process goal: protect all pieces, check for threats, castle early, use all pieces, or stay calm after a mistake. During the game, they practice the goal. After the game, they reflect. Did they follow the process? Where did their emotions interfere? What position will they remember? What is one adjustment for next time? This turns chess into a mirror for self-awareness.",
      "The emotional part cannot be ignored. Chess can bring up frustration quickly. A student who loses a queen may want to quit. A student who gets checkmated may feel embarrassed. A student who wins may become arrogant. These reactions are not distractions from the lesson; they are the lesson. The board gives students a safe place to practice managing success and disappointment. The teacher's role is to help students interpret those feelings instead of being controlled by them.",
      "One practical classroom phrase captures this well: the move after the mistake matters. Every player blunders. The real test is what happens next. Does the student collapse emotionally, move instantly, accuse the opponent, or give up? Or can they breathe, identify the new threats, and find the best resource? That recovery skill is resilience in action. It is also one of the clearest ways chess transfers to life. A bad grade, an argument, a missed opportunity, or a personal setback is not the end of the game. The next move still matters.",
      "Chess also teaches leadership. Not leadership as dominance, but leadership as clear thinking under pressure. A good player must coordinate pieces, assign responsibilities, and understand how one part of the board affects another. A good leader does the same with people and problems. They see relationships. They anticipate consequences. They understand that a strong position is built through cooperation, timing, and trust. In that sense, chess becomes a metaphor for community as much as individual growth.",
      "The piece-coordination lesson is especially useful for students. A queen alone can be powerful, but unsupported attacks often fail. Knights, bishops, rooks, pawns, and the king all have roles. The strongest positions are harmonious. That concept can help young people understand teams, classrooms, families, and communities. Success is not only about the strongest individual. It is about how responsibilities work together. A student who learns this on the board can begin to see collaboration differently off the board.",
      "Ellington's message also challenges the idea that chess is only for naturally gifted students. His story suggests that chess can develop a person, not merely reveal talent. This distinction matters. If chess is only for the already brilliant, it becomes exclusive. If chess is a tool for building focus, discipline, confidence, and resilience, it becomes accessible. Students do not need to be experts to benefit. They need a teacher who connects the game to growth.",
      "For parents and schools, the practical question is not simply whether chess improves test scores or produces champions. The deeper question is what kind of thinking chess helps students practice. Does it help them pause before reacting? Does it help them see consequences? Does it help them recover from mistakes? Does it help them respect opponents? Does it help them believe that effort changes outcomes? If the answer is yes, then chess has value even for students who never enter a tournament.",
      "The life lesson at the center of Ellington's talk is that every person is playing positions they did not fully choose. Family circumstances, neighborhoods, pressures, opportunities, and setbacks all shape the board. But chess teaches that even difficult positions contain choices. The goal is not to pretend every position is equal. The goal is to develop the vision, discipline, and courage to make the best move available.",
      "That is a mature and hopeful message for young people. It does not promise that life will be fair. It does not claim that one brilliant move solves everything. It teaches something more durable: study the position, learn from the past, plan for the future, and keep moving with purpose. Each game becomes practice for resilience. Each mistake becomes material for growth. Each decision becomes a chance to become more intentional.",
      "Chess changed Ellington's life because it gave him a new way to think about pressure, failure, and possibility. That is the same gift it can offer students. On the surface, they are learning kings, queens, rooks, bishops, knights, and pawns. Beneath the surface, they are learning how to manage themselves. They are learning that setbacks can be studied, that plans can be revised, that discipline can be built, and that their next move matters.",
      "That is why chess is more than a game. It is a blueprint for becoming. It teaches young people to see beyond the immediate moment and to act with intention. It gives them a structure for resilience and a language for growth. Most importantly, it reminds them that even when the position is difficult, they are not powerless. There is always another move to find."
    ]
  },
  {
    "slug": "chess-revolutionize-learning-cody-pomeranz",
    "category": "Learning and decision-making",
    "tags": ["chess and learning", "critical thinking", "school chess program", "decision-making skills", "student confidence"],
    "title": "How Chess Can Revolutionize Learning: Teaching Students to Think Before They Act",
    "metaTitle": "How Chess Can Revolutionize Learning: Teaching Students to Think Before They Act",
    "metaDescription": "See how chess can support learning by helping students explore options, evaluate consequences, and make calmer decisions in school and life.",
    "excerpt": "Chess helps students make their thinking visible: explore options, evaluate consequences, and choose with more patience.",
    "author": "Coach Chris",
    "publishedDate": "2026-05-19",
    "updatedDate": "2026-05-19",
    "canonicalPath": "#/blog/chess-revolutionize-learning-cody-pomeranz",
    "featuredImage": "https://i.ytimg.com/vi/A3yDvM8aplY/hqdefault.jpg",
    "imageAlt": "Cody Pomeranz TEDxYale thumbnail for a talk about how chess can revolutionize learning.",
    "audience": "Parents, school leaders, chess teachers, enrichment coordinators, and educators interested in social-emotional learning.",
    "sourceNote": "Source video: How Chess Can Revolutionize Learning: Cody Pomeranz at TEDxYale, TEDx Talks, published June 2, 2013.",
    "source": "Cody Pomeranz's TEDxYale talk",
    "videoId": "A3yDvM8aplY",
    "videoTitle": "How Chess Can Revolutionize Learning: Cody Pomeranz at TEDxYale",
    "videoUrl": "https://youtu.be/A3yDvM8aplY",
    "summaryIntro": "Coach Chris takeaway: chess works in classrooms because it makes the decision process visible. Students can point to a move, explain the idea, and learn from the result.",
    "sectionHeadings": [
      { "beforeParagraph": 0, "title": "Why Chess Makes Thinking Visible" },
      { "beforeParagraph": 1, "title": "Explore Options, Evaluate Consequences, Act" },
      { "beforeParagraph": 3, "title": "How Chess Supports Academic Habits" },
      { "beforeParagraph": 5, "title": "Learning From Defeat Without Shame" },
      { "beforeParagraph": 7, "title": "Chess as an Equalizer in Schools" },
      { "beforeParagraph": 10, "title": "Teaching Chess as a Thinking Routine" },
      { "beforeParagraph": 13, "title": "Patience, Behavior, and Better Choices" },
      { "beforeParagraph": 16, "title": "Why Chess Programs Need the Right Culture" },
      { "beforeParagraph": 18, "title": "The Classroom Revolution Is a Decision Process" }
    ],
    "relatedSlugs": ["chess-lessons-for-life-rasheme-ellington", "chess-emotional-intelligence-ash-reddy", "how-to-calculate-better-in-chess"],
    "body": [
      "Chess has a rare ability to make student thinking visible. In most classrooms, a teacher can see the final answer, but not always the decision process behind it. On a chessboard, every move leaves a trail: what the student noticed, what they missed, and how they handled pressure. That is why Cody Pomeranz's TEDxYale talk, \"How Chess Can Revolutionize Learning,\" still matters for schools and families looking for practical critical-thinking habits.",
      "That three-part model is simple enough for children and deep enough for education. Explore your options. Evaluate the consequences. Act. Those steps are built into every serious chess move. A student looks at checks, captures, threats, defenses, and plans. The student compares candidate moves, imagines possible replies, and chooses. After the move is made, the board gives feedback. Sometimes the feedback is positive. Sometimes the student discovers that they missed a tactic or ignored a threat. Either way, learning becomes concrete.",
      "This is the educational power of chess: it slows decision-making down without making it boring. Many students are told to \"think before you act,\" but that phrase can feel abstract. Chess gives it shape. If a student grabs a pawn and loses a queen, the lesson is immediate. If a student pauses, notices a fork, and wins material, the reward is immediate. The game becomes a laboratory for cause and effect. Students learn that choices are not isolated events. A move changes the board, creates new possibilities, and closes others.",
      "That is why chess belongs in conversations about academic growth. It strengthens habits that students need across subjects. In math, students must evaluate multiple paths to a solution. In reading, they must infer motives, track relationships, and revise their understanding as new information appears. In writing, they must plan, organize, anticipate the reader, and make deliberate choices. In science, they must form hypotheses and test consequences. Chess rehearses all of those habits in a form that feels like play.",
      "Pomeranz's talk emphasizes that chess can improve more than raw calculation. It cultivates patience, concentration, memory, spatial reasoning, strategy, and tactical awareness. Those skills matter because school success is rarely about one isolated talent. A student may understand a concept but lack the patience to work through a difficult problem. Another student may have strong memory but weak planning. Another may be creative but impulsive. Chess asks all of those mental muscles to cooperate. It rewards students who can hold a position in mind, notice patterns, restrain impulses, and choose a plan.",
      "One of the strongest educational arguments for chess is that it teaches students how to learn from defeat. Many children experience mistakes as personal failure. They feel exposed when an answer is wrong. They avoid difficult tasks because they do not want to feel inadequate. Chess normalizes error in a productive way. Even strong players lose. Even winning players make inaccuracies. Every completed game contains teachable moments. The question after a loss is not \"are you bad at chess?\" The question is \"where did the position change, and what can you learn from it?\"",
      "That question is transformative. It moves students from shame to analysis. A student who loses a game can identify the turning point: a hanging piece, a missed checkmate, a weak back rank, a poor trade, a rushed move, or a failure to notice the opponent's threat. Once the turning point is named, improvement becomes specific. Instead of thinking, \"I always lose,\" the student can think, \"I need to check for captures before I move,\" or \"I need to defend my king before attacking.\" That is a growth mindset in action, but it is grounded in evidence on the board.",
      "The social value of chess is just as important. Pomeranz points to chess as an equalizer, and that idea is especially powerful in schools. At the board, students who might otherwise be separated by age, background, popularity, academic confidence, language skill, or athletic ability can meet on common ground. The rules are the same for everyone. A quiet student can defeat a louder student. A younger student can surprise an older one. A student who struggles in traditional classroom tasks can experience competence through pattern recognition, focus, and creativity.",
      "That equalizing effect can raise confidence. Confidence does not come only from praise; it comes from evidence that effort changes performance. When a student learns the ladder mate, solves a tactic, or notices a discovered attack for the first time, they gain proof that their mind can grow. The board becomes a record of progress. Yesterday they hung pieces. Today they protected them. Last month they did not see forks. Now they look for overloaded pieces. Improvement becomes visible, and visible improvement builds self-esteem.",
      "For teachers, this means chess should be taught as a thinking curriculum, not simply as a recreational club. Recreation has value, but the full educational promise of chess requires intentional instruction. Students need vocabulary for their thinking: candidate moves, threats, weaknesses, responsibility, coordination, calculation, and consequences. They need routines: check for checks, captures, and threats; ask what the opponent wants; compare at least two moves; explain the purpose of the move. They need reflection: what changed, what worked, what should you try next time?",
      "A chess teacher can make these routines accessible to sixth graders by using questions instead of lectures. What is attacking what? Which piece has a job? What happens if that defender moves? What is your opponent threatening? If you trade every piece, are you actually winning, or just simplifying? What small advantage can you improve? These questions force students to look beyond material count and begin thinking about position. They also mirror the habits of mature decision-making. Before acting, understand the situation.",
      "The beauty of chess is that it allows students to practice high-level thinking with low emotional stakes. A blunder hurts, but it is still a game. The student can reset the pieces and try again. That repeatable cycle is valuable. Schools often ask students to perform before they have practiced enough. Chess gives them many repetitions of meaningful decision-making. Each game is a new attempt. Each tactic puzzle is a contained challenge. Each post-game review turns experience into knowledge.",
      "Chess also teaches delayed gratification. The best move is often not the most obvious move. Beginners want to capture everything. Stronger students learn that a quiet move can be powerful: improving a piece, defending a weakness, creating a threat, restricting an opponent, or preparing a tactic. That lesson matters outside chess. Students learn that the immediate reward is not always the best reward. They learn to plan, wait, and build. In a world designed to reward speed and reaction, chess teaches deliberate attention.",
      "That deliberate attention is one reason chess can help classroom behavior. A student who practices pausing before a move is practicing inhibition. A student who learns to consider the opponent's reply is practicing perspective-taking. A student who reviews a loss without exploding is practicing emotional regulation. These are the same skills teachers need students to use during discussions, transitions, group work, and independent assignments. Chess does not magically solve behavior problems, but it gives teachers a concrete structure for practicing better choices.",
      "The key is to connect the board to life without becoming preachy. Students usually resist moral lectures, but they understand consequences when they see them. If a student attacks before castling and gets checkmated, the teacher can ask, \"What did you want, and what did you ignore?\" That question applies to schoolwork, friendships, sports, and daily choices. Wanting something is not enough. You must also understand risk. Chess turns that principle into an experience.",
      "Pomeranz's broader claim is that chess can revolutionize learning because it changes how students see intelligence. Intelligence becomes less about being naturally gifted and more about developing a process. Strong players are not strong because they never make mistakes. They are strong because they notice more, calculate more carefully, learn from losses, and keep improving. That message is valuable for students who think they are \"not math people,\" \"not readers,\" or \"not smart.\" Chess shows that skill is built.",
      "Of course, chess should not be oversold as a miracle cure. A chess program is only as strong as its teaching culture. If the culture is harsh, elitist, or obsessed only with trophies, many students will disengage. If the culture is thoughtful, structured, and reflective, chess can become one of the most effective tools in a school. It can support academic habits, social-emotional learning, and student confidence at the same time.",
      "A strong school chess program should therefore measure success broadly. Tournament results are one measure, but not the only one. Are students explaining their ideas more clearly? Are they checking their work? Are they showing patience with partners? Are they learning from losses? Are they making connections between chess thinking and classroom thinking? Are students who normally struggle finding a place to succeed? Those outcomes may matter more than a trophy case.",
      "The revolution Pomeranz points toward is not about replacing traditional education with chess. It is about recognizing that games can teach serious habits when adults frame them well. Chess is a board game, but it is also a model of decision-making. It asks students to look carefully, consider alternatives, accept consequences, and revise their strategy. Those are the habits of strong learners.",
      "In the end, the strongest reason to teach chess is not that every student will become a competitive player. Most will not. The strongest reason is that every student makes decisions. Every student faces consequences. Every student needs to learn how to pause, analyze, and act with purpose. Chess gives them a place to practice that process over and over again. On the board, they learn to explore their options, evaluate the consequences, and make a move. In life, that same habit can change everything."
    ]
  },
  {
    "slug": "chess-emotional-intelligence-ash-reddy",
    "category": "Emotional intelligence",
    "tags": ["chess emotional intelligence", "social-emotional learning", "student self-control", "children's chess lessons", "resilience"],
    "title": "Chess Builds More Than Strong Players: It Builds Emotionally Intelligent Students",
    "metaTitle": "Chess Builds More Than Strong Players: It Builds Emotionally Intelligent Students",
    "metaDescription": "Learn how chess supports emotional intelligence by helping students practice patience, self-control, empathy, resilience, and respectful competition.",
    "excerpt": "Chess gives students a safe place to practice patience, self-control, empathy, resilience, and respectful competition.",
    "author": "Coach Chris",
    "publishedDate": "2026-05-19",
    "updatedDate": "2026-05-19",
    "canonicalPath": "#/blog/chess-emotional-intelligence-ash-reddy",
    "featuredImage": "https://i.ytimg.com/vi/kMTga50-j3g/hqdefault.jpg",
    "imageAlt": "Ash Reddy TEDxUQ thumbnail for a talk about chess as an educational tool for emotional intelligence.",
    "audience": "Parents, school leaders, chess teachers, enrichment coordinators, and educators interested in social-emotional learning.",
    "sourceNote": "Source video: Chess: an educational tool for Emotional Intelligence | Ash Reddy | TEDxUQ, TEDx Talks, published March 13, 2020.",
    "source": "Ash Reddy's TEDxUQ talk",
    "videoId": "kMTga50-j3g",
    "videoTitle": "Chess: an educational tool for Emotional Intelligence | Ash Reddy | TEDxUQ",
    "videoUrl": "https://www.youtube.com/watch?v=kMTga50-j3g",
    "summaryIntro": "Coach Chris takeaway: the emotional side of chess is not extra. Patience, recovery, respect, and self-control are part of becoming a stronger player.",
    "sectionHeadings": [
      { "beforeParagraph": 0, "title": "Chess Builds Emotional Intelligence, Not Just Strong Players" },
      { "beforeParagraph": 2, "title": "Responsibility Becomes Visible on the Board" },
      { "beforeParagraph": 4, "title": "Young Students Can Practice Patience and Respect" },
      { "beforeParagraph": 6, "title": "Healthy Competition Builds Empathy" },
      { "beforeParagraph": 7, "title": "Middle School Chess and Emotional Control" },
      { "beforeParagraph": 9, "title": "Technical Chess and Emotional Objectives Belong Together" },
      { "beforeParagraph": 13, "title": "Managing Classroom Conflict Through Chess" },
      { "beforeParagraph": 16, "title": "How Teachers Make Transfer Explicit" },
      { "beforeParagraph": 18, "title": "What Success Looks Like Beyond Trophies" }
    ],
    "relatedSlugs": ["chess-lessons-for-life-rasheme-ellington", "chess-revolutionize-learning-cody-pomeranz", "how-to-calculate-better-in-chess"],
    "body": [
      "Chess is often introduced to children as a game for smart kids, but that undersells what the board can do. Parents see a child learning to think ahead. Teachers see structure. Coaches see discipline. All of that is true, but Ash Reddy's TEDxUQ talk pushes the conversation further: chess can also build emotional intelligence, self-control, social confidence, and resilience.",
      "That framing matters because many students do not need chess to become another pressure system in their lives. They already experience enough competition, comparison, and judgment. What they need is a structured environment where they can practice handling frustration, making choices, respecting an opponent, recovering from mistakes, and recognizing that their emotions affect their decisions. Chess is unusually good at creating that environment because it gives children immediate feedback without needing a teacher to lecture them. A rushed move has a consequence. A thoughtful move has a purpose. A loss can hurt, but it can also be reviewed, understood, and improved upon.",
      "The emotional value of chess starts with the fact that the game is fair but not always easy. Both players begin with the same material. Both players have the same rules. No dice roll rescues a poor decision, and no hidden card gives a surprise advantage. The child must sit inside the position that they helped create. That can be uncomfortable, but it is also powerful. In many classroom situations, students can blame the assignment, the teacher, the group, or the circumstances. In chess, responsibility becomes visible. The board quietly asks: What did you notice? What did you miss? What will you do next?",
      "That question is the heart of emotional intelligence. A student who blunders a queen may feel embarrassed, angry, or defeated. A weaker chess culture might treat that moment as failure. A stronger educational culture treats it as a lesson in emotional regulation. The teacher can help the student pause, breathe, name what happened, and look for the next best move. The position may be worse, but the game is not automatically over. The student learns that an emotional reaction does not have to control the next decision. That is not just chess improvement. That is life training.",
      "One of Reddy's most useful contributions is the idea that chess can be taught to very young children when the goal is development rather than elite performance. A child does not need to understand deep opening theory to benefit from chess. A child can learn how pieces move, how to take turns, how to wait, how to look before acting, and how to shake hands after a game. Those small habits are not small in the life of a classroom. They are the building blocks of self-management and social awareness.",
      "Consider the simple act of waiting for an opponent to move. For adults, waiting is normal. For children, especially younger children, waiting can feel like losing control. Chess gives waiting a purpose. The child learns that the opponent's thinking time is not empty time; it is a chance to observe threats, plan responses, and practice patience. Instead of saying, \"hurry up,\" the student can learn to ask, \"what might they be trying to do?\" That shift turns impatience into curiosity. It also teaches empathy, because the child begins to recognize that the opponent has ideas, plans, fears, and responsibilities too.",
      "That empathy is one reason chess can soften the stereotype of competition. Competition does not have to mean domination. In a healthy chess classroom, the opponent is not an enemy; the opponent is a partner in learning. Each player gives the other a challenge. Each player reveals the other's blind spots. Each player helps create the conditions for growth. When students understand that, losing becomes less humiliating and winning becomes less arrogant. The post-game conversation can become as important as the result: What was your plan? Where did the game change? What did you see that I missed?",
      "This is where chess becomes especially useful for middle school students. Sixth graders are old enough to understand tactics, threats, and checkmate patterns, but they are still developing emotional control. A student may know how a fork works and still rush into a one-move blunder because they were excited. A student may know the value of material and still make a poor trade because they wanted revenge after losing a piece. Chess exposes the gap between knowledge and judgment. It shows students that knowing the right answer is not the same as being calm enough to choose it.",
      "That gap is familiar to every teacher. Students often know classroom expectations but fail to follow them in the moment. They know they should not interrupt, but they interrupt. They know they should check their work, but they rush. They know they should treat classmates respectfully, but frustration takes over. Chess gives teachers a concrete, non-shaming language for those moments. Instead of saying, \"you made a bad choice,\" the teacher can say, \"let's look at the position before the move.\" That language lowers defensiveness because it focuses on thinking, not character.",
      "A strong chess lesson can therefore include emotional objectives alongside technical ones. The tactical objective might be recognizing a pin, fork, skewer, or mating net. The emotional objective might be slowing down before capturing, accepting that the first move you see is not always best, or learning to continue after a mistake. When those objectives are combined, students begin to understand that chess strength is not only about finding flashy moves. It is about building a reliable thinking process.",
      "The most important thinking process in beginner and intermediate chess is simple: stop, observe, ask, choose. Stop before moving. Observe checks, captures, threats, and weaknesses. Ask what the opponent wants. Choose a move that improves your position or solves the problem. That process is also a model for emotional intelligence. Stop before reacting. Observe your feeling. Ask what outcome you want. Choose a response that helps instead of harms. The board becomes a rehearsal space for better behavior.",
      "This is why Reddy's argument belongs in schools. Many school chess programs make the mistake of measuring success only through ratings, trophies, and tournament results. Those things can motivate some students, but they can also narrow the purpose of the program. If the only goal is to create winners, then many students will eventually feel excluded. But if the goal is to use chess to develop patience, resilience, planning, fairness, and confidence, then every student can benefit. The quiet beginner who learns to make eye contact and say \"good game\" is succeeding. The impulsive student who starts checking for threats before moving is succeeding. The emotional student who loses without flipping the board is succeeding.",
      "This does not mean technical chess instruction is unimportant. In fact, emotional growth becomes more meaningful when the chess itself is real. Students should learn tactics, checkmates, endgames, piece coordination, and strategy. They should experience the satisfaction of finding a tactic and the disappointment of missing one. The difference is that the teacher frames those moments as part of a larger developmental journey. A tactic is not just a trick. It is evidence that the student noticed relationships between pieces. A loss is not just a bad result. It is information.",
      "The emotional intelligence model also helps teachers manage classroom culture. Chess naturally produces conflict: illegal moves, touch-move arguments, accusations of cheating, frustration over losing, and disagreements about rules. Those moments can derail a class if the teacher treats them only as discipline problems. But they can become teachable moments if the teacher asks students to connect chess behavior to character. Why do rules matter? Why does honesty make the game more fun? How do we show respect when we are disappointed? What does it mean to win well?",
      "The answer is not to make chess soft or consequence-free. Students should be held accountable. But accountability should teach. A student who cheats can be asked to explain how cheating changes the meaning of the game. A student who gloats can be asked how they would feel on the other side of the board. A student who gives up after one mistake can be shown defensive resources and reminded that resilience is a skill. The chessboard gives every correction a context.",
      "The larger message of Reddy's talk is that chess belongs in education because it connects thinking with feeling. It teaches students that every move carries responsibility, but it does so in a space where mistakes are expected. It teaches students that the opponent has agency, but it does so through play. It teaches students that improvement comes from reflection, not from pretending mistakes never happened. In that sense, chess is more than a game of kings and queens. It is a classroom for decision-making.",
      "For a teacher, the practical challenge is to make that purpose explicit. Do not simply put boards in front of students and hope the lessons appear. Ask reflection questions. Celebrate thoughtful losses. Model calm analysis. Teach students to explain their moves and listen to their opponents. Use chess vocabulary to name life habits: responsibility, patience, empathy, resilience, fairness, and focus. When students begin to see those habits on the board, they can begin to transfer them off the board.",
      "The best chess classrooms do not ask, \"Who is the smartest player here?\" They ask, \"Who is learning to think more clearly, handle pressure more calmly, and treat others more respectfully?\" That is a different standard of success, and it is a better one for children. A student may never become a champion, but they can become more patient. They may never memorize openings, but they can learn to pause before reacting. They may never win a trophy, but they can learn to lose with dignity and try again.",
      "That is the real promise of chess as an emotional intelligence tool. It does not replace social-emotional learning; it makes it visible. It turns abstract character lessons into concrete choices on sixty-four squares. Every game becomes a small story about planning, responsibility, respect, and recovery. And when chess is taught that way, the board is not merely a place where children prove how smart they are. It becomes a place where they practice who they are becoming."
    ]
  },
  {
      "slug": "emotional-intelligence-in-chess-pressure",
      "category": "Chess psychology",
      "tags": [],
      "title": "Emotional Intelligence in Chess: How to Handle Pressure Without Losing Your Mind",
      "metaTitle": "Emotional Intelligence in Chess: How to Handle Pressure and Play Better",
      "metaDescription": "Learn how emotional intelligence helps chess players manage pressure, recover from mistakes, avoid tilt, improve focus, and make better decisions during serious games.",
      "excerpt": "A practical guide for students, competitors, and coaches on staying flexible, composed, and clear when the game gets stressful.",
      "author": "Coach Chris",
      "publishedDate": "2026-05-19",
      "updatedDate": "2026-05-19",
      "canonicalPath": "#/blog/emotional-intelligence-in-chess-pressure",
      "featuredImage": "https://i.ytimg.com/vi/CqgmozFr_GM/hqdefault.jpg",
      "imageAlt": "TED-Ed video thumbnail for a lesson on staying calm under pressure, connected to emotional intelligence in chess.",
      "audience": "Students, competitors, coaches, parents, and tournament players who want to handle chess pressure with more composure.",
      "sourceNote": "Source video: How to stay calm under pressure - Noa Kageyama and Pen-Pen Chen, TED-Ed, YouTube. Conceptual base also references Josephine Perry's Psyche guide on performing well under pressure.",
      "source": "TED-Ed pressure video and Josephine Perry's Psyche guide",
      "videoId": "CqgmozFr_GM",
      "videoTitle": "How to stay calm under pressure - Noa Kageyama and Pen-Pen Chen",
      "videoUrl": "https://www.youtube.com/watch?v=CqgmozFr_GM",
      "summaryIntro": "Coach Chris takeaway: pressure is not a sign that the player is weak. It is a signal to slow down, name what is happening, and return to the board.",
      "sectionHeadings": [
          {
              "beforeParagraph": 0,
              "title": "Introduction: Chess Is Not Only Calculation. It Is Self-Control.",
              "note": "Frame pressure as a chess skill, not a personal weakness."
          },
          {
              "beforeParagraph": 5,
              "title": "Why Pressure Feels So Intense in Chess",
              "note": "Explain why chess pressure feels personal and immediate."
          },
          {
              "beforeParagraph": 10,
              "title": "The Problem With Trying to Be Mentally Tough",
              "note": "Show why rigid self-talk usually makes players less accurate."
          },
          {
              "beforeParagraph": 26,
              "title": "Mental Flexibility: The Chess Player's Real Pressure Skill",
              "note": "Connect flexible thinking to stronger practical decisions."
          },
          {
              "beforeParagraph": 31,
              "title": "Separate Yourself From the Thought Before It Becomes a Move",
              "note": "Teach players to notice pressure thoughts before obeying them."
          },
          {
              "beforeParagraph": 36,
              "title": "A Simple Over-the-Board Reset",
              "note": "Give students a short reset routine after panic or surprise."
          },
          {
              "beforeParagraph": 42,
              "title": "Label the Emotion More Precisely",
              "note": "Use specific emotional labels to choose better responses."
          },
          {
              "beforeParagraph": 60,
              "title": "Replace Pressure Language With Process Language",
              "note": "Swap identity-pressure language for board-focused tasks."
          },
          {
              "beforeParagraph": 78,
              "title": "Pressure Situation 1: Playing a Higher-Rated Opponent",
              "note": "Keep the rating in perspective and play the board."
          },
          {
              "beforeParagraph": 83,
              "title": "Pressure Situation 2: Converting a Winning Position",
              "note": "Stay process-focused when a good position starts to feel fragile."
          },
          {
              "beforeParagraph": 87,
              "title": "Conversion Checklist",
              "note": "Use practical questions before trying to convert an advantage."
          },
          {
              "beforeParagraph": 93,
              "title": "Pressure Situation 3: Recovering After a Blunder",
              "note": "Prevent one mistake from becoming a full emotional collapse."
          },
          {
              "beforeParagraph": 98,
              "title": "Pressure Situation 4: Time Trouble",
              "note": "Compress the thinking process when the clock is low."
          },
          {
              "beforeParagraph": 102,
              "title": "Pressure Situation 5: Teaching, Coaching, and Playing in Front of Others",
              "note": "Model calm analysis when other people are watching."
          },
          {
              "beforeParagraph": 105,
              "title": "Values: The Anchor When the Game Gets Chaotic",
              "note": "Use values as a stable anchor when outcomes feel uncertain."
          },
          {
              "beforeParagraph": 123,
              "title": "How to Train Emotional Intelligence in Chess",
              "note": "Review emotional patterns the same way students review moves."
          },
          {
              "beforeParagraph": 126,
              "title": "Post-Game Emotional Review",
              "note": "Use these questions after serious games."
          },
          {
              "beforeParagraph": 132,
              "title": "A Simple Routine Before Every Serious Game",
              "note": "Prepare the emotional process before the first move."
          },
          {
              "beforeParagraph": 138,
              "title": "A Student-Friendly Version",
              "note": "Translate pressure skills into language younger students can use."
          },
          {
              "beforeParagraph": 142,
              "title": "The Emotionally Intelligent Chess Checklist",
              "note": "A compact checklist for pressure moments."
          },
          {
              "beforeParagraph": 150,
              "title": "Conclusion: The Strongest Players Stay Flexible",
              "note": "Close with flexibility as the core pressure skill."
          }
      ],
      "relatedSlugs": [
          "chess-emotional-intelligence-ash-reddy",
          "how-to-calculate-better-in-chess",
          "chess-lessons-for-life-rasheme-ellington"
      ],
      "body": [
          "Chess is often described as a game of logic, memory, calculation, and pattern recognition. That description is true, but incomplete. Anyone who has played a serious tournament game knows that the hardest part of chess is not always finding a move. Sometimes the hardest part is handling yourself while trying to find that move.",
          "You can know tactics, openings, endgames, and strategic plans, yet still fall apart when the position becomes messy. You can study for hours, then blunder because you got scared of your opponent's rating. You can be winning, then panic because you realize you are winning. You can lose one piece and immediately start playing like the game is already over. That is not a chess knowledge problem. That is an emotional intelligence problem.",
          "Emotional intelligence in chess is the ability to notice what you are feeling, understand how those feelings affect your decisions, and choose a response that helps you play the position in front of you. It is not about becoming emotionless. It is not about pretending pressure does not exist. It is about staying flexible enough to keep making good decisions even when your body and brain are screaming at you to rush, freeze, force, or give up.",
          "A useful psychology article by sport psychologist Josephine Perry argues that high performance under pressure depends less on a hard, rigid idea of mental toughness and more on mental flexibility: the ability to acknowledge pressure, adapt to the situation, and act in line with your values instead of being controlled by fear. That idea applies almost perfectly to chess. The board changes every move. Your emotional state changes every move. The player who survives pressure best is not always the toughest player. It is often the most flexible one.",
          "Chess pressure is not a sign that you are weak. It is a signal that the game matters to you. The skill is learning how to use that signal without letting it drive the car.",
          "Chess is emotionally strange because the consequences are public, personal, and immediate. When you lose a basketball game, you can tell yourself the team lost. When you lose a chess game, it feels like the board points directly at you. Your move was wrong. Your calculation failed. Your plan was flawed. Your opponent saw something you missed.",
          "That makes chess pressure different from ordinary stress. Chess attacks the ego. A bad move can feel like evidence that you are not smart enough, not talented enough, not prepared enough, or not improving fast enough. This is why many players tilt after one mistake. The position may still be playable, but emotionally they already left the game.",
          "The most common pressure points in chess include playing a higher-rated opponent, defending a worse position, converting a winning position, entering time trouble, facing unfamiliar openings, losing a key game in a tournament, playing in front of teammates or students, and trying to prove that your rating or reputation is deserved.",
          "In each of these situations, the player is not only solving the position. The player is also managing a story. The story might be: I have to win this. I should know this. I cannot lose to this person. Everyone will think I am bad. I threw this game away. These stories create emotional noise, and emotional noise interferes with calculation.",
          "The answer is not to remove emotion. That is impossible. The answer is to recognize emotion quickly enough that it does not secretly choose your move for you.",
          "Many chess players respond to pressure by trying to become harder on themselves. They tell themselves to stop being nervous, stop being weak, stop blundering, stop caring, or stop feeling anything. At first, this sounds strong. In practice, it often makes performance worse.",
          "Rigid self-talk creates a threat state. Instead of asking, What does the position need? the player starts asking, What does this move say about me? That is a dangerous shift. The board becomes secondary. The ego becomes primary.",
          "A player stuck in this state often becomes predictable. They over-force attacks because they want to prove something. They refuse a draw because they feel they should win. They play too passively because they are afraid to make the decisive mistake. They blitz out moves to escape discomfort. They avoid calculating the opponent's best defense because they do not want to discover that their idea fails.",
          "This is where emotional intelligence becomes practical. A chess player does not need to be fearless. A chess player needs to be honest. Fear is information. Anger is information. Embarrassment is information. Overconfidence is information. None of those emotions should be allowed to make the move, but all of them can tell you something about what is happening internally.",
          "Rigid pressure response",
          "Flexible chess response",
          "I must win this game.",
          "I have an opportunity to play a strong game and make good decisions.",
          "I should know this opening.",
          "I do not fully know this position, so I will return to principles.",
          "I cannot believe I blundered.",
          "The position changed. What is the best move now?",
          "I have to find a tactic.",
          "I will check forcing moves, then improve my worst piece if nothing works.",
          "I am losing, so it is over.",
          "I am worse, but I can still create problems and make my opponent prove it.",
          "Mental flexibility means you can change your response when the situation changes. That is chess. You prepare an opening, but your opponent plays a sideline. You plan a kingside attack, but the center opens. You win a pawn, but the endgame becomes dangerous. You build pressure, but your opponent finds the one defensive resource you hoped they would miss.",
          "A rigid player clings to the first plan. A flexible player updates the plan.",
          "This is exactly why emotional flexibility matters. The player who is emotionally rigid becomes attached to outcomes: I need to win, I need to prove I am better, I need this attack to work, I need this sacrifice to be correct. The flexible player can say: I wanted this to work, but it does not. I need a new candidate move.",
          "Strong chess is full of emotional flexibility. You must be willing to reject beautiful moves. You must be willing to defend ugly positions. You must be willing to simplify when you wanted to attack. You must be willing to repeat moves when the position gives you nothing better. You must be willing to admit that your opponent's idea is good.",
          "That is not weakness. That is accuracy.",
          "One of the most useful pressure skills is learning to separate yourself from your thoughts. In chess, thoughts often appear as commands: attack now, trade everything, move fast, do not lose, you are terrible, you are winning, do not mess this up.",
          "The problem is that a thought can feel like a fact. If you think, I am going to blow this game, your body may react as if the collapse has already happened. Your hands move faster. Your calculation shortens. You stop searching for resources. You play the fear instead of the board.",
          "A flexible player creates distance. Instead of saying, I am going to blow this, say: I am noticing that I am having the thought that I might blow this. That sounds small, but it changes the relationship. The thought is no longer a command. It is just noise in the room.",
          "This is especially useful after a blunder. Many players do not lose because of the first mistake. They lose because of the emotional reaction to the first mistake. They see the evaluation change, feel shame, and then immediately make a second mistake. A single blunder becomes a collapse.",
          "The goal is to pause long enough to avoid letting the emotion make the next move.",
          "1.  Notice the thought: I am panicking, I am embarrassed, I am rushing, or I am afraid to lose.",
          "2.  Create distance: I am noticing that I am having the thought that this game is slipping away.",
          "3.  Return to the board: What changed? What is attacked? What are the checks, captures, and threats?",
          "4.  Choose a process: candidate moves, opponent replies, final position, evaluation.",
          "5.  Make the best available move, not the move that repairs your ego.",
          "The reset does not guarantee a good move. It gives you the chance to make one.",
          "Many players use vague emotional labels during games. They say they are mad, nervous, tilted, or stressed. Those labels are not wrong, but they are often too broad to be useful. Emotional intelligence improves when your emotional vocabulary becomes more precise.",
          "A player who says I am angry may actually be embarrassed because they missed a tactic. A player who says I am nervous may actually be uncertain because they do not understand the pawn structure. A player who says I am tilted may actually be disappointed because they prepared carefully and the game did not reward them.",
          "The more precise label gives you a better response. If you are embarrassed, you need to stop protecting your ego and return to the position. If you are uncertain, you need to simplify the decision tree and identify candidate moves. If you are disappointed, you need to separate the result of this game from the quality of your long-term training.",
          "Affect labeling is not soft. It is tactical. If you misdiagnose the emotion, you choose the wrong coping strategy.",
          "Broad label",
          "More useful chess-specific label",
          "I am angry.",
          "I feel embarrassed because I missed a simple resource.",
          "I am nervous.",
          "I feel uncertain because I do not understand the position.",
          "I am tilted.",
          "I feel rushed and want the discomfort to end.",
          "I am scared.",
          "I feel threatened by the opponent's rating or attack.",
          "I am confident.",
          "I feel comfortable, but I still need to check their counterplay.",
          "I am losing it.",
          "I feel overloaded because there are too many candidate moves and not enough time.",
          "Certain words increase pressure before the position even begins. The most dangerous ones are should, must, have to, always, and never. These words sound disciplined, but they often create rigidity.",
          "I should beat this player. I must not lose this endgame. I have to convert this. I always choke. I never play well in tournaments. None of these sentences help you calculate. They turn the game into a referendum on your identity.",
          "Process language is better because it gives the mind a task. Instead of I must win, use I need to improve my worst piece. Instead of I should know this, use I will find a solid setup. Instead of I cannot blunder, use I will do a final blunder check before moving.",
          "The goal is not forced positivity. The goal is useful language. A chess player under pressure needs language that leads to action.",
          "Pressure language",
          "Process language",
          "I should win this.",
          "I will play the position move by move.",
          "I must attack.",
          "I will calculate forcing moves first, then decide.",
          "I cannot lose this.",
          "I will make my opponent solve problems.",
          "I always mess up winning positions.",
          "I am noticing that fear of conversion is here. I will slow down.",
          "I have to move fast.",
          "I will use my time on irreversible decisions.",
          "This is embarrassing.",
          "The board does not care. What is the best move now?",
          "A higher-rated opponent creates invisible pressure. Before the game even starts, many players begin negotiating with themselves. A draw would be good. Maybe I should play something safe. Maybe I need to surprise them. What if they know all my openings?",
          "This is where emotional intelligence matters. The rating is real information, but it is not a move. It does not calculate. It does not defend. It does not make your opponent immune to mistakes. A flexible mindset respects the opponent without surrendering agency.",
          "The wrong response is to play the rating. The right response is to play the board.",
          "Against a stronger opponent, your values should guide you. Maybe your value is courage: you will look for active moves instead of slowly suffocating. Maybe your value is discipline: you will not sacrifice without calculation. Maybe your value is learning: you will stay present even if the game becomes difficult.",
          "The practical goal is simple: make them beat you with good moves, not with your fear.",
          "Many players are calmer when they are equal than when they are winning. This seems strange, but it makes sense emotionally. When you are equal, nothing has been secured yet. When you are winning, the result suddenly feels like something you can lose. The mind shifts from opportunity to protection.",
          "That protection instinct can ruin technique. A player starts avoiding all complications, even useful ones. They trade into bad endgames just because trading feels safe. They stop asking what the position needs and start asking how to avoid embarrassment.",
          "Winning positions require flexibility. Sometimes the right move is simplification. Sometimes the right move is keeping tension. Sometimes the right move is returning material to reach a clean endgame. Sometimes the right move is continuing the attack because the opponent's counterplay is not real.",
          "The emotional skill is to stop worshipping the evaluation. Do not think, I am winning, so I must win. Think, I am better, so my job is to keep choosing moves that preserve or increase the advantage. That keeps your attention on process instead of panic.",
          "What is my opponent threatening right now?",
          "Can I remove counterplay before improving my position?",
          "Which trades help me, and which trades help them?",
          "Is my king safe enough to continue attacking?",
          "Can I convert by creating a second weakness?",
          "Before moving, what is their most annoying reply?",
          "A blunder is not only a chess event. It is an emotional event. The board changes, but so does your nervous system. Your heart rate jumps. Your face gets hot. You want to move immediately, resign emotionally, or prove that the blunder was not so bad.",
          "This is the moment where many players need a rule: no emotional reply moves. After a blunder, the first move you want to play is often a reaction, not a calculation. You want revenge. You want to trade pieces. You want to attack. You want to move fast because sitting with the mistake hurts.",
          "Instead, treat the position like a new puzzle. The old game is gone. The new game starts now. Ask what the material count is, what the king safety situation is, whether you have counterplay, whether you can create threats, and whether the opponent still has technical problems to solve.",
          "A surprising number of bad positions are still difficult to win. The player who blundered but stays emotionally present often gets chances. The player who blundered and emotionally quits does not.",
          "A blunder changes the position. Tilt changes the player. You can often survive the first. The second is what usually ends the game.",
          "Time pressure exposes emotional habits. Some players freeze. Some move instantly. Some calculate the same line repeatedly because they are afraid to commit. Some choose the move that looks active simply because activity feels better than uncertainty.",
          "The solution is not to become reckless. It is to simplify your decision process. In time trouble, you cannot calculate like you have twenty minutes. You need a compressed version of good thinking.",
          "Use a three-question routine: What is hanging? What are the checks? What is the safest active move? This keeps your mind on concrete dangers and playable moves. It also prevents the classic time-pressure disaster of making a move that ignores an immediate tactic.",
          "Emotional intelligence in time trouble means accepting that you will not find perfection. You are trying to find a move that keeps the game alive, avoids immediate disaster, and creates practical problems. That is different from trying to solve everything.",
          "Chess pressure is not limited to tournaments. It appears when students watch you analyze, when parents ask why a position is winning, when you play a casual game against someone who expects you to win, or when you demonstrate a tactic and suddenly cannot find the cleanest line.",
          "For a coach, emotional intelligence is doubly important. Students do not only learn chess from what you say. They learn from how you respond to mistakes. If you panic when your analysis is challenged, students learn that being wrong is dangerous. If you calmly investigate, correct yourself, and explain the process, students learn that chess is a thinking discipline.",
          "A coach with emotional flexibility can say: That line may not work. Let's check the defense. That is not weakness; it is modeling real calculation. It teaches students that chess strength is not pretending to know everything. Chess strength is being willing to test ideas honestly.",
          "Goals and values are not the same. A goal is an outcome: win the tournament, reach 1800, beat a rival, make the team, qualify for a section, or prove you belong. Values are how you want to act while pursuing the goal: patient, courageous, honest, disciplined, curious, resilient, respectful.",
          "Goals create pressure because they can be lost. Values create direction because they can be practiced on every move.",
          "This is a powerful idea for chess players. You cannot fully control the result. Your opponent gets moves too. You can blunder. You can run into preparation. You can get a bad pairing. You can have a bad day. But you can still choose values that improve your play and your relationship with the game.",
          "A player whose value is discipline can do a blunder check in a winning position. A player whose value is courage can calculate the active defense instead of passively waiting. A player whose value is curiosity can analyze a loss without turning it into self-hate. A player whose value is respect can stop underestimating lower-rated opponents.",
          "Chess value",
          "How it appears during pressure",
          "Discipline",
          "I check my opponent's forcing moves before I move.",
          "Courage",
          "I consider active defenses instead of only trying not to lose.",
          "Patience",
          "I improve the position when no tactic is available.",
          "Honesty",
          "I abandon a beautiful idea when the defense refutes it.",
          "Curiosity",
          "I review the loss to understand it, not to punish myself.",
          "Respect",
          "I take every opponent seriously, regardless of rating.",
          "Emotional intelligence is trainable. You build it the same way you build calculation: through repetition, review, and honest feedback. The key is to treat emotional habits as part of chess training, not as a separate personality flaw.",
          "After each serious game, do not only ask where the evaluation changed. Ask where your emotional state changed. When did you rush? When did you get scared? When did you become overconfident? When did you stop calculating your opponent's best move? When did you play the move you wanted to be true instead of the move you had verified?",
          "This kind of review can be uncomfortable, but it is extremely useful. Many players repeat the same emotional mistakes for years because they only analyze moves. They know which tactic they missed, but they never identify the pressure pattern that caused them to miss it.",
          "1.  What was the most stressful moment of the game?",
          "2.  What emotion was present: fear, embarrassment, impatience, anger, excitement, relief, or overconfidence?",
          "3.  What did that emotion make me want to do?",
          "4.  Did I follow my calculation process or abandon it?",
          "5.  What phrase or routine would have helped me stay flexible?",
          "6.  What value do I want to practice in the next game?",
          "Before a game, do not only prepare openings. Prepare your emotional process. You do not need a dramatic motivational speech. In fact, dramatic speeches can increase pressure. You need a simple reminder of how you want to think.",
          "Try this pre-game routine:",
          "1.  Name one value for the game, such as discipline, patience, courage, or curiosity.",
          "2.  Accept that nerves may appear and that they do not need to disappear before you can play well.",
          "3.  Commit to one process habit: candidate moves, blunder check, clock check, or emotional reset after surprises.",
          "4.  Remind yourself that the goal is not to feel perfect. The goal is to keep returning to the board.",
          "For younger students, emotional intelligence can be taught with very simple language. You do not need to introduce psychological terms. You can connect it directly to chess decisions.",
          "A useful classroom phrase is: Feelings are allowed. Feelings are not moves. A student can feel nervous, disappointed, excited, or frustrated, but the next move still needs to be chosen by looking at the board.",
          "Another useful phrase is: Mistakes are information. If a student blunders a queen and immediately wants to quit, the lesson is not only about queen safety. It is about resilience. Can they continue looking for checks? Can they create threats? Can they make the opponent win properly? Can they learn from the moment without collapsing?",
          "This matters because chess teaches more than chess. It teaches students how to sit with discomfort, slow down, recover, adjust, and keep thinking. That is emotional intelligence in action.",
          "1.  Notice: What am I feeling right now?",
          "2.  Name it: Is it fear, frustration, embarrassment, impatience, excitement, or uncertainty?",
          "3.  Separate: I am noticing this feeling; I do not have to obey it.",
          "4.  Return: What changed on the board?",
          "5.  Calculate: What are the checks, captures, threats, and candidate moves?",
          "6.  Respect: What is my opponent's best reply?",
          "7.  Choose: What move fits the position and my values?",
          "8.  Release: After moving, let the last decision go and prepare for the next one.",
          "Emotional intelligence is integral to chess because chess constantly puts the player under pressure. The game asks you to calculate while uncertain, evaluate while afraid, recover while embarrassed, and choose while the clock is running. Pure knowledge is not enough if emotion keeps hijacking the decision-making process.",
          "The best response is not to become rigidly tough. The better response is to become flexible. Notice your thoughts without becoming them. Label your emotions accurately. Replace pressure language with process language. Break the habit of reacting automatically. Anchor yourself in values that can survive any result.",
          "In the end, chess improvement is not only about seeing more moves. It is about seeing the position clearly while your emotions are trying to distort it. The board will always create pressure. Your job is not to eliminate that pressure. Your job is to keep thinking well inside it."
      ]
  },
  {
      "slug": "pokemon-tcg-and-chess",
      "category": "Strategic games",
      "tags": [],
      "title": "Why Pokemon TCG Is More Like Chess Than People Think",
      "metaTitle": "Pokemon TCG and Chess: Why Both Games Reward Preparation, Theory, and Skill",
      "metaDescription": "Pokemon TCG and chess look completely different, but both reward preparation, matchup knowledge, theory, board structure, emotional discipline, and long-term analysis.",
      "excerpt": "Preparation, theory, board structure, matchup knowledge, and skill expression across two very different competitive games",
      "author": "Coach Chris",
      "publishedDate": "2026-05-20",
      "updatedDate": "2026-05-20",
      "canonicalPath": "#/blog/pokemon-tcg-and-chess",
      "featuredImage": "/images/pokemon-tcg-pokemon-cards.jpg",
      "imageAlt": "Hands holding Pokemon TCG cards during a game, representing strategic planning and resource management.",
      "audience": "Chess students, Pokemon TCG players, parents, coaches, and competitive beginners who want to understand how strategic games reward study and preparation.",
      "sourceNote": "Source draft: pokemon_tcg_chess_blog.docx. Featured image supplied as Pokemon_TCG_PokemonCards.jpg. Source video added from YouTube.",
      "source": "Original Horizon Chess strategic-games blog draft and YouTube video",
      "videoId": "71BG08fOEwg",
      "videoTitle": "Pokemon is way more Complex than you Know",
      "videoUrl": "https://www.youtube.com/watch?v=71BG08fOEwg",
      "summaryIntro": "Coach Chris takeaway: Pokemon TCG and chess reward the same kind of serious competitor: someone who prepares, studies patterns, manages resources, and reviews mistakes honestly.",
      "sectionHeadings": [
          {
              "beforeParagraph": 0,
              "title": "Pokemon TCG and Chess Are More Similar Than They Look",
              "note": "Start with the shared competitive mindset behind both games."
          },
          {
              "beforeParagraph": 4,
              "title": "1. Preparation: The Meta Is Pokemon's Version of Opening Knowledge",
              "note": "Compare Pokemon meta prep to chess opening preparation."
          },
          {
              "beforeParagraph": 10,
              "title": "2. Picking a Deck Is Like Picking an Opening",
              "note": "Show why depth with one system beats constant switching."
          },
          {
              "beforeParagraph": 17,
              "title": "3. Theory: Both Games Are About Building the Right Board",
              "note": "Connect chess piece placement to Pokemon board setup."
          },
          {
              "beforeParagraph": 24,
              "title": "4. Skill Expression: Time Invested Eventually Shows",
              "note": "Explain why study and repetition show up over time."
          },
          {
              "beforeParagraph": 30,
              "title": "5. The Best Players Usually Have a Team",
              "note": "Highlight the value of coaches, clubs, and testing groups."
          },
          {
              "beforeParagraph": 36,
              "title": "6. Growth Is Intangible, So You Have to Measure It",
              "note": "Use review notes and game logs to make progress visible."
          },
          {
              "beforeParagraph": 44,
              "title": "7. Tempo and Initiative Matter in Both Games",
              "note": "Show how forcing the opponent to respond creates pressure."
          },
          {
              "beforeParagraph": 48,
              "title": "8. Resource Management Is a Shared Skill",
              "note": "Compare pieces, time, cards, energies, and prize-map resources."
          },
          {
              "beforeParagraph": 54,
              "title": "9. Matchups and Opponent Tendencies Change the Plan",
              "note": "Explain why preparation must stay flexible."
          },
          {
              "beforeParagraph": 58,
              "title": "10. Emotional Control Separates Good Players From Consistent Players",
              "note": "Connect tilt control in both games to consistent performance."
          },
          {
              "beforeParagraph": 64,
              "title": "A Simple Comparison",
              "note": "Summarize the practical similarities in plain language."
          },
          {
              "beforeParagraph": 71,
              "title": "Final Thought: Different Games, Same Competitive Mindset",
              "note": "Close with the shared discipline behind both games."
          }
      ],
      "relatedSlugs": [
          "how-to-calculate-better-in-chess",
          "emotional-intelligence-in-chess-pressure",
          "chess-revolutionize-learning-cody-pomeranz"
      ],
      "body": [
          "At first glance, Pokemon TCG and chess look like completely different games. Chess is played on a fixed board with perfect information. Pokemon is a card game with decks, prizes, draws, matchups, and a level of randomness that chess does not have. One game has kings, queens, rooks, and pawns. The other has Pokemon, energies, trainers, abilities, attacks, and prize cards.",
          "But the more time you spend around both games, the more you realize they are connected by the same competitive truth: the player who prepares better, understands the structure of the game better, and makes fewer careless mistakes under pressure is usually going to have the best chance to win.",
          "Pokemon may not be chess in a literal sense, but it rewards a lot of the same skills. You need preparation. You need theory. You need matchup knowledge. You need to understand what your board is supposed to look like. You need to recognize when your opponent is ahead, when you are ahead, and when you need to change plans. You need emotional control. You need to review your losses honestly. And just like in chess, you need to accept that progress is not always easy to see day to day.",
          "That is why I think Pokemon TCG is one of the best comparisons to chess. Both games look simple from the outside, but once you actually compete, you realize how much depth there is beneath the surface.",
          "In chess, one of the first serious steps toward improvement is learning openings. Not because openings win the game by themselves, but because openings give you structure. They help you understand what kind of middlegame you are heading into, what plans are normal, what traps exist, and what mistakes you are trying to avoid.",
          "Pokemon has the same concept through the meta. Understanding the meta means knowing what decks are popular, what matchups you are likely to face, what each deck is trying to set up, and what kind of pace each matchup usually follows.",
          "In chess, if you play the Italian Game, the Queen's Gambit, the Sicilian, or the Caro-Kann, you are not just memorizing random moves. You are learning the ideas behind the structure. Which squares matter? Which pieces belong where? What pawn breaks are important? What kind of endgame might you reach? What tactics appear often?",
          "In Pokemon, when you study the meta, you are asking similar questions. What does my deck need on the first few turns? Which Pokemon do I need in play? Which cards help me stabilize? What is my opponent trying to establish? Can I race them, disrupt them, or force them into awkward exchanges? Where does my deck usually fall behind, and where does it usually take control?",
          "A chess player who ignores openings can still play legal moves, but they will often reach positions they do not understand. A Pokemon player who ignores the meta can still shuffle up and play, but they will often be surprised by common lines, common techs, and common pressure points.",
          "That does not mean you need to memorize everything. It means you need to know what world you are entering before the game begins.",
          "One of the biggest mistakes newer players make in both games is trying to learn everything at once. In chess, they jump from opening to opening. One week they want to play the King's Gambit. Then they switch to the London. Then they try the Sicilian. Then they decide they need a full repertoire against every possible first move. They never stay with one system long enough to understand it deeply.",
          "Pokemon players can fall into the same trap. They constantly switch decks because one deck won a tournament, another deck looks fun, another deck seems easier, and another deck has a better matchup spread on paper. They keep changing before they learn how their deck actually works under pressure.",
          "Picking a deck is very similar to picking an opening. You do not need to learn every deck in the format the same way a chess player does not need to play every opening. You need to find something you enjoy, something that fits how you think, and something you are willing to practice long enough to master.",
          "There is a huge difference between knowing what a deck does and knowing how to play it well. The same is true with openings. A chess player might know the first six moves of an opening, but that does not mean they understand the resulting position. They might know where the pieces go, but not why they go there.",
          "Pokemon works the same way. A player might copy a strong decklist, but that does not mean they understand sequencing, prize mapping, resource management, matchup plans, or how to adjust when the opening hand is awkward. The list is only the starting point. Mastery comes from repetition.",
          "The best choice is usually not the deck that looks perfect for one weekend. It is the deck you are willing to put time into. It is the deck where the mistakes teach you something instead of making you immediately give up. It is the deck where your comfort level becomes an advantage.",
          "In both chess and Pokemon, comfort matters. When you are under pressure, you fall back on what you know best. If you are always switching, you never build that foundation.",
          "The biggest similarity between Pokemon and chess is that both games are built around board structure. Chess is obviously a board game, but Pokemon is also about building a board, even if the pieces are cards instead of wooden or digital pieces.",
          "In chess, your board structure includes your king safety, your pawn structure, your piece activity, your control of key squares, your open files, your weak squares, and your long-term plans. You are trying to arrange your pieces so they work together. A rook on an open file, a knight on an outpost, a bishop on a strong diagonal, a queen pressuring weaknesses, and a safe king can all combine into a winning position.",
          "In Pokemon, your board structure is your active Pokemon, your bench, your energy attachments, your available abilities, your hand, your discard pile, your prize map, and your remaining resources. A strong board is not random. It is built toward a purpose. Your deck has a theory behind how it wants to set up and how it wants to win.",
          "That is why beginner mistakes in both games often come from not knowing what the ideal board is supposed to look like. In chess, a beginner may move the same piece too many times, ignore development, weaken their king, or push pawns without understanding the squares they leave behind. In Pokemon, a beginner may bench the wrong Pokemon, attach energy inefficiently, burn key resources too early, or fail to understand which attacker they need for a specific matchup.",
          "The details are different, but the underlying mistake is the same: the player is making moves without understanding the structure they are trying to build.",
          "Strong players do not just ask, 'What can I do right now?' They ask, 'What position am I trying to reach?' In chess, that might mean reaching a favorable middlegame or endgame. In Pokemon, that might mean creating the correct board state to take prizes efficiently, survive a key turn, or force the opponent into an uncomfortable exchange.",
          "That is theory. Theory is not just memorization. It is understanding why certain setups are strong and why other setups create problems later.",
          "Both games reward the player who puts in the work. That does not mean the better player wins every single game. Chess has blunders, nerves, time pressure, and practical mistakes. Pokemon has variance, opening hands, prizes, and matchup differences. But over time, skill shows.",
          "In chess, the player who studies openings, solves tactics, reviews games, learns pawn structures, and understands common middlegame plans is going to improve faster than the player who only plays casually and never studies. There is no shortcut around that.",
          "Pokemon follows the same pattern. The player who tests matchups, understands the meta, learns sequencing, practices prize mapping, and reviews losses honestly is going to become stronger than the player who only plays games without reflection.",
          "This is where people sometimes misunderstand card games. Because there is randomness, they assume skill matters less. But randomness does not remove skill. It changes how skill expresses itself. A strong Pokemon player cannot control every draw, but they can build better lists, make better sequencing decisions, conserve resources, know when to take risks, and give themselves the highest percentage chance to win.",
          "Chess is the same in a different way. You cannot control what your opponent plays, but you can prepare your openings, calculate accurately, avoid emotional decisions, and learn from repeated patterns. In both games, the goal is not to guarantee victory every time. The goal is to maximize your likelihood of success.",
          "That phrase matters: maximize your likelihood of success. That is what serious players are doing. They are not trying to play perfectly because perfect play is unrealistic. They are trying to make better decisions more consistently than their opponents.",
          "It is possible to improve alone. You can study alone, play alone, watch videos alone, read articles alone, and analyze your own games. But at a certain point, having a team makes improvement much easier.",
          "Chess players benefit from training partners, coaches, clubs, and study groups. Someone else may notice a weakness in your opening repertoire that you missed. They might show you an idea in a position you have played many times but never understood correctly. They might help you prepare for a tournament or explain why a move you like is actually inaccurate.",
          "Pokemon players benefit from the same thing. A testing group can help you understand matchups faster. One person may discover a tech card that changes a difficult matchup. Another may notice that a certain line of play works better going second. Another may test against a deck you struggle with and explain where your plan is failing.",
          "A team matters because no individual sees everything. When you train alone, you are limited by your own perspective. When you train with other serious players, everyone brings something different to the table. You learn faster because your group combines experience.",
          "This does not mean you need a professional team. A few serious friends can make a huge difference. The important part is that the group actually wants to improve. If everyone is honest, focused, and willing to test ideas, the whole group gets stronger.",
          "In both chess and Pokemon, a team helps you avoid living inside your own assumptions. That is one of the fastest ways to improve.",
          "One of the hardest parts of improving at chess or Pokemon is that growth is not always visible. If you lift weights, you may see your muscles grow. If you run track, your times may get faster. If you practice a musical instrument, you may hear a song become smoother.",
          "But in strategic games, progress can be harder to feel. You might be improving even while still losing. You might understand more but still make mistakes. You might play a better game than last month and still lose because your opponent was stronger.",
          "That is why you need to measure progress through review, not just results.",
          "In chess, this means recording your games, analyzing them afterward, and looking for repeated mistakes. Are you losing because of opening traps? Are you missing tactics? Are you trading into bad endgames? Are you moving too quickly when the position requires calculation? Are you getting emotional after one mistake and then making three more?",
          "In Pokemon, the review process is similar. Are you losing because you do not know the matchup? Are you sequencing incorrectly? Are you using resources too early? Are you failing to plan your prizes? Are you building boards that look active but do not actually support your win condition? Are you blaming luck when there was a better line available?",
          "Notetaking matters because memory is unreliable. After a loss, it is easy to remember the unlucky draw or the one painful turn. But if you write things down, you start to see patterns. Maybe you keep making the same mistake with your opening setup. Maybe you keep misjudging when to switch attackers. Maybe you keep entering chess middlegames without a clear plan. Maybe you keep playing too fast in winning positions.",
          "Those patterns are where improvement lives.",
          "Growth in these games is intangible until you make it visible. Notes, recorded games, match logs, review sessions, and honest self-analysis turn vague frustration into specific training goals.",
          "Another similarity worth adding is tempo. Chess players talk about tempo all the time. A move with tempo is a move that improves your position while forcing your opponent to respond. If you develop a piece while attacking something, you gained time. If you make your opponent retreat while improving your own activity, you may be taking control of the game.",
          "Pokemon has its own version of tempo. Sometimes one player gets to set up while forcing the other player to answer threats. A player who attacks efficiently, disrupts at the right time, or forces awkward responses can gain the initiative. The opponent may technically still have options, but they are no longer choosing freely. They are reacting.",
          "This is a major part of competitive play. In both games, you want to ask: am I making my opponent solve problems, or am I the one constantly being forced to answer theirs?",
          "When you have the initiative in chess, your opponent may not have time to execute their plan. When you have the initiative in Pokemon, your opponent may not have time to set up the board they wanted. In both cases, pressure creates mistakes.",
          "Chess and Pokemon also share a deep resource-management layer. In chess, your resources are pieces, pawns, time, king safety, open files, weak squares, and sometimes even the ability to trade into a favorable endgame. You cannot treat every piece as disposable. Every exchange changes what kind of position you are playing.",
          "In Pokemon, resources are even more obvious. You have cards in hand, cards in deck, cards in discard, energy attachments, switching options, supporters, abilities, prize cards, and attackers. Using a resource at the wrong time can cost you later, even if the play looked fine in the moment.",
          "This is one of the biggest steps from beginner to advanced play. Beginners often ask, 'Can I do this?' Stronger players ask, 'Should I do this now, or will I need this resource later?'",
          "In chess, you might be able to trade a bishop for a knight, but should you? You might be able to win a pawn, but does it open your king? You might be able to force a queen trade, but does the resulting endgame actually favor you?",
          "In Pokemon, you might be able to use a key card immediately, but should you save it? You might be able to take a prize now, but does it expose your board? You might be able to chase a knockout, but does it leave you without resources for the next turn?",
          "The best players are not just looking at the current move. They are thinking about the future position created by that move.",
          "In both games, preparation gives you a starting plan, but the opponent determines what actually happens. You can prepare an opening in chess, but your opponent may choose a sideline, a sharper variation, or a quiet setup. You can prepare a Pokemon deck for the meta, but your opponent may play a list with unusual choices, different pacing, or a tech you did not expect.",
          "This is why flexibility matters. A rigid player only knows one plan. A strong player understands the purpose behind the plan and can adjust.",
          "In chess, maybe your normal attacking setup does not work because your opponent traded a key defender or changed the pawn structure. In Pokemon, maybe your normal setup is too slow for the matchup and you need to take a different route. In both games, the plan is not sacred. The goal is to win the position you actually have, not the one you expected to have.",
          "That is where experience matters. The more games you play and review, the better you become at recognizing when the original plan should be followed and when it should be abandoned.",
          "There is also a mental side that connects both games. Chess players tilt after blunders. Pokemon players tilt after bad draws, awkward prizes, or a matchup that feels unfair. In both games, emotional control can be the difference between losing one game and losing an entire event.",
          "The strongest players do not avoid frustration completely. They simply recover faster. They can make a mistake, accept it, and keep playing the current position. They can lose a close game and still make good decisions in the next round. They can experience pressure without letting that pressure destroy their thinking process.",
          "This is part of skill expression too. It is not enough to know the right plan when you are calm. You need to be able to find the right plan when the clock is low, the tournament matters, your hand is awkward, your opponent is pressuring you, or you just made a mistake.",
          "Chess and Pokemon both punish emotional decisions. Moving instantly because you are angry, overextending because you feel behind, or giving up mentally because the game started poorly can all turn a difficult position into a lost one.",
          "A good competitor learns to pause. What is still possible? What does my opponent need? What is my best chance? What mistake am I about to make because I am frustrated?",
          "That kind of emotional intelligence is part of the game, even when it does not show up on the board or in the decklist.",
          "Preparation: chess players study openings, pawn structures, and common plans, while Pokemon TCG players study the meta, matchup plans, and deck testing.",
          "Main choice: chess players choose an opening repertoire, while Pokemon TCG players choose a deck and learn it deeply.",
          "Theory: chess rewards knowing ideal piece placement and middlegame structures, while Pokemon rewards knowing ideal board setup and win conditions.",
          "Skill expression: chess shows skill through calculation, pattern recognition, and time management, while Pokemon shows skill through sequencing, resource management, and prize mapping.",
          "Teamwork: chess players improve through coaches, clubs, and training partners, while Pokemon players improve through testing groups, deck builders, and matchup partners.",
          "Growth: chess uses game analysis, notation, engine review, and pattern tracking, while Pokemon uses match logs, testing notes, replay discussion, and matchup review.",
          "Mental game: chess players recover from blunders and time pressure, while Pokemon players recover from variance, bad starts, and hard matchups.",
          "Pokemon TCG and chess may not look the same, but they reward the same type of competitor: someone who prepares, studies, tests, adapts, and learns from mistakes.",
          "Chess teaches you that every move changes the position. Pokemon teaches the same lesson in a different language. Every card you play, every Pokemon you bench, every energy you attach, and every resource you spend changes what kind of game you are playing.",
          "In both games, success is not just about knowing the rules. It is about understanding the structure beneath the rules. It is about knowing what your setup is supposed to accomplish, how your opponent is trying to stop you, and how to give yourself the best chance to win.",
          "That is why preparation matters. That is why comfort with your deck or opening matters. That is why theory matters. That is why teams matter. That is why reviewing your games matters. And that is why the best players in both games are not just talented. They are disciplined.",
          "They put themselves in positions where their skill can show.",
          "That is the real connection between Pokemon and chess. Both games reward the player who treats every game as information, every mistake as a lesson, and every tournament as another chance to sharpen their thinking."
      ]
  },
{
    "slug": "clearance-sacrifices-piece-activity",
    "category": "Chess improvement",
    "tags": [],
    "title": "Get Out of Your Own Way: Clearance Sacrifices and the Hidden Value of Activity",
    "metaTitle": "Clearance Sacrifices and Piece Activity in Chess",
    "metaDescription": "Learn how clearance sacrifices open lines, free squares, and improve piece activity so chess students evaluate more than material.",
    "excerpt": "Clearance sacrifices teach students when opening a line or freeing a square can matter more than keeping every pawn.",
    "author": "Coach Chris",
    "publishedDate": "2026-05-22",
    "updatedDate": "2026-05-22",
    "canonicalPath": "#/blog/clearance-sacrifices-piece-activity",
    "featuredImage": "https://i.ytimg.com/vi/FeTUa8GvTU8/hqdefault.jpg",
    "imageAlt": "Sunil Weeramantry chess lecture thumbnail for an article on clearance sacrifices and piece activity.",
    "audience": "Beginner and intermediate chess students, parents, and players learning to value piece activity beyond material counts.",
    "sourceNote": "Source draft: clearance_sacrifices_blog_post.pdf. Source video: Sunil Weeramantry lecture at the Parker Chess Club March 2026, Chess Videos by John Brezina, YouTube.",
    "source": "Clearance sacrifices PDF draft and Sunil Weeramantry lecture",
    "videoId": "FeTUa8GvTU8",
    "videoTitle": "Sunil Weeramantry lecture at the Parker Chess Club March 2026",
    "videoUrl": "https://www.youtube.com/watch?v=FeTUa8GvTU8&t=28s",
    "summaryIntro": "Coach Chris takeaway: a clearance sacrifice is not about looking flashy. It is about opening the road or square a stronger piece needs.",
    "sectionHeadings": [
      {
        "beforeParagraph": 0,
        "title": "Get Out of Your Own Way",
        "note": "Start with why material values do not tell the whole story."
      },
      {
        "beforeParagraph": 6,
        "title": "Ask Better Questions Than What Can I Take?",
        "note": "Use piece activity questions before chasing captures."
      },
      {
        "beforeParagraph": 12,
        "title": "Pieces Have Jobs",
        "note": "Match each piece to the lines or squares it needs."
      },
      {
        "beforeParagraph": 16,
        "title": "Line Clearance Opens the Road",
        "note": "See why bishops and rooks need open lanes."
      },
      {
        "beforeParagraph": 20,
        "title": "Square Clearance Gives Knights a Home",
        "note": "Connect clearance to knight outposts and useful landing squares."
      },
      {
        "beforeParagraph": 24,
        "title": "Do Not Capture Every Weakness Immediately",
        "note": "Keep pressure when the threat is stronger than the quick capture."
      },
      {
        "beforeParagraph": 30,
        "title": "A Better Way to Evaluate Positions",
        "note": "Balance material with activity, roads, squares, and pressure."
      },
      {
        "beforeParagraph": 33,
        "title": "The Real Lesson of Clearance Sacrifices",
        "note": "Close with the practical question students can take to their games."
      }
    ],
    "relatedSlugs": [
      "how-to-calculate-better-in-chess",
      "pokemon-tcg-and-chess"
    ],
    "body": [
      "One of the biggest jumps a chess player can make is learning that chess is not just about counting points. Most beginners are taught a simple value system: pawns are worth 1, knights and bishops are worth 3, rooks are worth 5, and queens are worth 9. That system is useful because it helps students avoid giving away material for no reason. But if a player relies on it too much, they start to misunderstand the game.",
      "Chess is not accounting. A piece is not valuable because a chart says it is valuable. A piece is valuable because of what it can actually do.",
      "A bishop trapped behind its own pawns is not really acting like a full bishop. A rook with no open file is not really acting like a full rook. A knight with no useful square is not really acting like a dangerous knight. A queen with no way into the attack may look powerful, but it is only powerful in theory.",
      "This is where one of the most important attacking and positional ideas in chess comes in: the clearance sacrifice.",
      "A clearance sacrifice happens when you give up material to clear a line, square, or pathway for another piece. The sacrifice is not random. The goal is not to be flashy. The goal is to remove whatever is blocking your position from working properly.",
      "In simple terms: sometimes the best move is to get out of your own way.",
      "Newer players often look at a position and immediately ask, \"What can I capture?\"",
      "That is not a bad question, but it is not enough. If all you do is hunt for captures, you will miss the deeper purpose of the position.",
      "Stronger players ask better questions: which of my pieces is not participating, what line or square does it want, what is blocking it, can I remove the blocker, and what new threat appears after the blocker is gone?",
      "Those questions lead to better chess because they force you to think about piece activity, not just material.",
      "A player who only counts points may see a pawn sacrifice and think, \"I am losing a pawn.\" A stronger player may see the same sacrifice and think, \"I am giving up a pawn, but now my bishop becomes alive, my rook enters the game, or my knight reaches a permanent outpost.\"",
      "The move is not about losing material. It is about gaining function.",
      "Every piece has a job.",
      "A bishop wants diagonals. A rook wants open files. A queen wants entry points. A knight wants strong squares. If your own pawn or piece prevents one of your pieces from doing its job, that pawn or piece may need to move, advance, or even be sacrificed.",
      "This is one of the clearest ways to explain clearance sacrifices to students: long-range pieces need roads. A bishop needs a diagonal. A rook needs a file. A queen needs access. If the road is blocked, the piece cannot travel. Sometimes you have to sacrifice something to open the road.",
      "Knights are different. Knights do not need roads. They jump. But knights still need landing squares. A knight without a useful square can look active for one move, but if it can be chased away, it is not really secure. For knights, clearance is usually about clearing a square, not a line.",
      "Imagine you have a bishop aimed toward the enemy king, but one of your own pawns blocks the diagonal. A beginner may think, \"That bishop is defended, so it is fine.\" But a stronger player asks, \"What is the bishop actually doing?\"",
      "If the bishop is stuck behind a pawn, it may not be doing enough. If moving or sacrificing that pawn opens the bishop toward the king, then the pawn may be less important than the diagonal it is blocking.",
      "The same idea applies to rooks. A rook on a closed file can look strong, but if the file never opens, the rook is only staring at its own pawn. Sometimes a pawn break or sacrifice is necessary to open the file and give the rook a way into the position.",
      "This is why strong chess players care so much about pawn breaks. A pawn break is not just pushing a pawn. It is often the move that changes which pieces are active and which pieces are passive.",
      "For knights, the question is slightly different. A knight does not need an open diagonal or file. A knight needs a square, and not just any square. It needs a square where it creates threats and cannot easily be chased away.",
      "One of the strongest knight concepts is the outpost. An outpost is a square protected by your pawn and difficult or impossible for your opponent to attack with a pawn. A knight on an outpost can become more powerful than a rook in some positions because it controls key squares, attacks weaknesses, and interferes with the opponent's coordination.",
      "Sometimes you sacrifice a pawn not because the pawn itself is unimportant, but because moving it clears a square for your knight.",
      "That is a more advanced way to understand material. You are not simply giving up one point. You are investing one point to create a long-term piece advantage.",
      "Another important lesson connected to clearance is patience.",
      "Many students see a weak pawn and immediately want to take it. But sometimes the weakness is more useful while it remains on the board.",
      "As long as the weakness exists, your opponent may have to defend it. Their pieces become tied down. Their position becomes awkward. If you capture too early, the weakness disappears, and your opponent may become more active.",
      "This connects to an old chess idea: the threat is often stronger than the execution.",
      "If you threaten to win a pawn, attack the king, invade with a rook, or jump into an outpost, your opponent has to respond. The pressure itself may be more valuable than the immediate capture.",
      "That is a very important lesson for improving players. Do not rush to cash in. First ask whether keeping the tension creates even stronger problems for your opponent.",
      "Instead of only asking, \"Who is ahead in material?\" ask whose pieces are more active, which pieces are blocked, which player controls the open files, which bishops have useful diagonals, which knights have permanent squares, and which weaknesses are tying pieces down.",
      "This is how chess starts to become more than tactics. Tactics still matter, of course. But tactics usually come from better piece activity. If your pieces are stuck, your tactics disappear. If your pieces are coordinated, tactical chances appear naturally.",
      "A clearance sacrifice is one of the clearest examples of this relationship. You give something up, but in return your pieces start working together.",
      "The real lesson of clearance sacrifices is not \"sacrifice pawns whenever you feel like it.\" That would be bad chess.",
      "The lesson is this: do not let your own pieces block your plan.",
      "If your bishop needs a diagonal, look for a way to open it. If your rook needs a file, look for a pawn break. If your queen needs an entry square, look for the obstruction. If your knight needs an outpost, ask whether a pawn move can create the route.",
      "Strong chess players do not sacrifice because they want to look brilliant. They sacrifice because the position demands activity.",
      "The next time you look at a chess position, do not only ask, \"What can I take?\" Ask a stronger question: \"What piece of mine is not doing its job, and what is stopping it?\"",
      "That question can change the way you play chess. Sometimes the winning move is not about adding more force. Sometimes the winning move is simply getting out of your own way."
    ]
  },
{
    "slug": "napoleon-chess-best-move",
    "category": "Chess stories",
    "tags": [],
    "title": "Napoleon, Chess, and the Best Move He Never Found",
    "metaTitle": "Napoleon, Chess, and the Best Move He Never Found",
    "metaDescription": "Napoleon was one of history's most famous military strategists, but he was only a mediocre chess player. His hidden chess set legend offers a lesson about strategy and awareness.",
    "excerpt": "Napoleon's chess stories turn into a practical lesson about assumptions, hidden resources, and searching for the best move.",
    "author": "Coach Chris",
    "publishedDate": "2026-05-22",
    "updatedDate": "2026-05-22",
    "canonicalPath": "#/blog/napoleon-chess-best-move",
    "featuredImage": "https://i.ytimg.com/vi/tYZw5PSV6yA/hqdefault.jpg",
    "imageAlt": "Penguin Supreme video thumbnail for the mystery of Napoleon's chess set and the best move he never found.",
    "audience": "Chess students, parents, history-minded players, and improving competitors learning to search for hidden resources.",
    "sourceNote": "Source draft: napoleon_chess_best_move_blog_post.pdf. Source video: The Mystery of Napoleon's Chess Set That Could've Freed Him, Penguin Supreme, YouTube.",
    "source": "Napoleon chess PDF draft and Penguin Supreme video",
    "videoId": "tYZw5PSV6yA",
    "videoTitle": "The Mystery of Napoleon's Chess Set That Could've Freed Him",
    "videoUrl": "https://www.youtube.com/watch?v=tYZw5PSV6yA",
    "summaryIntro": "Coach Chris takeaway: the best chess move is not always the move that looks loudest. Better players learn to question assumptions and search the whole position.",
    "sectionHeadings": [
      {
        "beforeParagraph": 0,
        "title": "Napoleon, Chess, and the Best Move He Never Found",
        "note": "Start with the contrast between battlefield reputation and chess discipline."
      },
      {
        "beforeParagraph": 6,
        "title": "Napoleon the Chess Player",
        "note": "Use Napoleon's chess reputation to discuss threats, development, and impatience."
      },
      {
        "beforeParagraph": 15,
        "title": "The Turk and the Illusion of Control",
        "note": "Connect chess assumptions to hidden tactics and incomplete evaluation."
      },
      {
        "beforeParagraph": 24,
        "title": "Exile, Surveillance, and a Chessboard",
        "note": "Introduce the St. Helena legend without overstating its historical certainty."
      },
      {
        "beforeParagraph": 35,
        "title": "The Best Move You Never See",
        "note": "Show how resources can stay invisible when a player searches too narrowly."
      },
      {
        "beforeParagraph": 45,
        "title": "Reputation Does Not Make the Move",
        "note": "The board rewards calculation, patience, and correction rather than status."
      },
      {
        "beforeParagraph": 52,
        "title": "Chess as a Mirror",
        "note": "Connect chess decisions to risk, pride, timing, and overextension."
      },
      {
        "beforeParagraph": 57,
        "title": "The Lesson for Students",
        "note": "Give students questions that widen the search for candidate moves."
      },
      {
        "beforeParagraph": 64,
        "title": "Conclusion: The Move Inside the Piece",
        "note": "Close on the hidden resource a student still has to notice."
      }
    ],
    "relatedSlugs": [
      "how-to-calculate-better-in-chess",
      "clearance-sacrifices-piece-activity",
      "chess-lessons-for-life-rasheme-ellington"
    ],
    "body": [
      "Napoleon Bonaparte built his life around strategy.",
      "He rose from a Corsican-born artillery officer to the ruler of France. He won battles, reshaped governments, forced Europe into coalition after coalition, and became one of the most studied military figures in history. His name is still tied to ambition, calculation, risk, and command.",
      "That is why his relationship with chess is so interesting.",
      "You would think that someone known for military genius would naturally excel at the game of kings. Chess is filled with language that sounds military: attack, defense, sacrifice, initiative, outposts, ranks, files, strategy, tactics, coordination, and king safety.",
      "But by most accounts, Napoleon was not a particularly strong chess player.",
      "That contrast is what makes the story powerful. Napoleon understood strategy on the battlefield, but chess requires a different kind of discipline. It does not reward reputation. Once the pieces are set up, every player has to answer the same question: what is the best move?",
      "Napoleon played chess throughout his life. He was connected to the chess culture of his time, including the famous Cafe de la Regence in Paris, and he played during military campaigns and exile.",
      "His chess style, at least from the games and stories usually associated with him, was not the careful, patient style we might expect from a master strategist. One opening line connected with him is 1. e4 e5 2. Qf3, later known as the Napoleon Opening.",
      "The idea is simple: bring the queen out early and aim pressure toward the weak f7 square.",
      "The problem is also simple. Bringing the queen out too early often violates an opening principle. Instead of developing pieces, controlling the center, and getting the king safe, White moves the queen before the rest of the army is ready. A good opponent can gain time by attacking the queen and developing naturally.",
      "That is a useful lesson for students. A move can have a threat and still be strategically flawed.",
      "Beginners often fall in love with immediate threats. They see the queen as the strongest piece, so they want to use it right away. But chess is not only about using your strongest piece. It is about using your pieces together.",
      "A queen that comes out too early can become a target. A knight that develops with tempo against the queen becomes useful. A bishop that enters the game while the queen runs around becomes active. The player who chases the queen may gain time, development, and control.",
      "Napoleon's name being attached to this opening is almost poetic. It suggests ambition, directness, and pressure, but also impatience.",
      "In chess, impatience often turns initiative into vulnerability.",
      "One of the better-known chess stories involving Napoleon is his game against the Turk, a famous chess-playing automaton.",
      "The Turk was presented as a machine that could play chess, but it was eventually revealed to be an illusion controlled by a hidden human player.",
      "The story works on two levels.",
      "On the surface, Napoleon lost to what appeared to be a machine. But the deeper point is that he was playing against something he did not fully understand. The opponent was not what it appeared to be.",
      "That happens constantly in chess.",
      "A position may look safe, but there may be a hidden tactic. A capture may look free, but it may open a file. An attack may look dangerous, but it may be bluffing. A quiet move may look harmless, but it may contain the real threat.",
      "Chess punishes assumptions. You cannot evaluate a position based only on appearance. You have to investigate what is actually happening.",
      "That is where many students struggle. They make a move because it looks good or because it creates a one-move threat. But good chess asks deeper questions: what is my opponent threatening, what changed after the last move, what is undefended, and what hidden resource might I be missing?",
      "The Turk is a perfect symbol for that idea. The board tells one story. The truth underneath tells another.",
      "After Napoleon's defeat at Waterloo in 1815, he was sent to St. Helena, a remote island thousands of miles away from France. Napoleon had already escaped one exile, returned to France, and taken power again during the Hundred Days. This time, his captors wanted distance, isolation, and control.",
      "On St. Helena, his life was heavily monitored. His mail was opened. His movement was restricted. His residence at Longwood House was watched. Communication with the outside world became difficult, and his circle grew smaller over time.",
      "In that environment, chess becomes more than a game. It becomes one of the few normal activities available to a man whose real political board had been taken away.",
      "This is where the famous legend begins.",
      "According to the story, Napoleon's supporters still hoped to help him escape. Because written communication was monitored, they supposedly tried to send him a secret message hidden inside a chess set. The set was made of carved ivory, and one of the pieces allegedly contained a hidden compartment with an escape plan.",
      "But the person trusted to deliver the message died before reaching Napoleon, so Napoleon never learned that the piece contained anything. He played with the set for years, never realizing that an escape plan was sitting inches away from his hand.",
      "It is a remarkable image: Napoleon, the great strategist, moving pieces across a board while the real best move was hidden inside one of them.",
      "The problem is that the story is probably not historically reliable.",
      "The known record from St. Helena includes diaries, memoirs, surveillance rules, and accounts from people around Napoleon. Those sources mention his confinement, the fear of escape, and chess-related items, but the specific hidden-message chess set story does not appear in the surviving contemporary evidence usually cited around the exile. The story seems to survive more as legend than confirmed fact.",
      "That does not make it useless. In some ways, it makes it more powerful.",
      "A legend does not always teach us because it is literally true. Sometimes it teaches because it captures a truth symbolically.",
      "The hidden chess set story is really a story about missed perception.",
      "Napoleon did not lose because the move was unavailable. In the legend, the move was right there. The problem was that he did not know where to look.",
      "That is one of the most important lessons in chess.",
      "Many players do not lose because the position is hopeless. They lose because they never notice the resource that was available. They miss the defensive move, the quiet move, the zwischenzug, the mating pattern, or the fact that the opponent's threat can be ignored because they have something stronger.",
      "The best move can sit in front of you and still be invisible.",
      "Every chess player has experienced this. You analyze after the game, and suddenly the answer looks obvious. Maybe you had a tactic. Maybe you could have won a piece. Maybe you could have forced checkmate. Maybe you could have saved a lost position. During the game, you never considered it.",
      "Why? Because your mind was looking in the wrong place.",
      "Maybe you were only looking for checks. Maybe you were only looking for captures. Maybe you were only trying to defend. Maybe you were only focused on your plan. You assumed the position had only one kind of solution.",
      "This is why chess improvement is not just about learning more patterns. It is about learning how to search.",
      "Strong players ask better questions. They do not just ask, \"What do I want?\" They ask, \"What does the position want?\"",
      "Napoleon's chess reputation also offers a useful reminder: being strategic in life does not automatically make someone good at chess.",
      "Chess is its own discipline. It requires calculation, patience, pattern recognition, humility, and constant correction. A brilliant person can still play bad moves. A confident person can still overlook tactics. A powerful person can still misunderstand a position.",
      "That is one reason chess is such a valuable teaching tool.",
      "The board is honest.",
      "It does not care how smart you think you are. It does not care how much you won yesterday. It does not care whether your last move looked aggressive. If the move is bad, the position will eventually expose it.",
      "This is especially important for students. Many young players want to win quickly. They want the flashy attack, the early queen move, the immediate checkmate threat. But chess teaches that force without coordination can become weakness.",
      "A queen brought out too early may become a target. A sacrifice without follow-up may become a blunder. An attack without development may collapse. A plan that ignores the opponent's resources may fail.",
      "The best players are not the ones who always attack. The best players are the ones who understand when to attack, when to defend, when to improve, when to simplify, and when to wait.",
      "The story of Napoleon and the hidden chess set works because chess is already a mirror for larger decisions.",
      "On the board, you have limited information, limited time, and an opponent trying to stop you. You have to make decisions under pressure. You have to balance risk and reward. You have to know when a sacrifice is real and when it is just hope. You have to understand that the strongest-looking move is not always the best move.",
      "That is why chess keeps producing stories like this. The game is small enough to fit on a table, but large enough to hold human ambition, fear, pride, patience, and failure.",
      "Napoleon's life was full of massive decisions. Some were brilliant. Some were disastrous. The invasion of Russia, the return from Elba, Waterloo, and the final exile to St. Helena all show themes chess players face in miniature: overextension, timing, coordination, calculation, and the danger of assuming that past success guarantees future success.",
      "Chess compresses those ideas into sixty-four squares.",
      "The Napoleon chess legend gives students a simple but powerful takeaway: do not assume the best move is obvious.",
      "Sometimes the best move is hidden because you are asking the wrong question.",
      "If you only ask how to attack, you may miss the move that improves your worst piece. If you only ask what you can capture, you may miss the move that creates a stronger threat. If you only ask how to stop your opponent, you may miss the move that gives you counterplay.",
      "That is the real connection between Napoleon, chess, and the best move he never found. Whether the hidden chess set story is true or not, it captures something every chess player understands: there are moments when the answer is close, but your thinking does not reach it.",
      "The goal of chess training is to reduce those moments.",
      "No player sees everything. But good training teaches you to slow down, ask better questions, and search the position more honestly.",
      "Before you move, ask what changed, what your opponent is threatening, what candidate moves you have, what you would play if you were not afraid or rushing, and what hidden resource the position might contain.",
      "Those questions are how you find better moves.",
      "The legend of Napoleon's chess set is powerful because it reverses what we expect.",
      "Napoleon was the man who moved armies, shaped nations, and forced Europe to respond to him. Yet in this story, he becomes the player who cannot see the move that matters. He moves the pieces, but the real solution remains hidden inside one of them.",
      "That is chess. The board can look familiar and still contain something you have not seen. The position can seem simple and still hold a resource. The best move can be close enough to touch and still go unplayed.",
      "For students, that is the lesson worth remembering. Do not just move pieces. Look inside the position. The best move may already be there."
    ]
  },
  {
    "slug": "the-art-of-learning-chess",
    "category": "Chess improvement",
    "tags": [],
    "title": "The Art of Learning Chess: Pressure, Failure, and Better Training",
    "metaTitle": "The Art of Learning Chess: Pressure, Failure, and Better Training",
    "metaDescription": "Josh Waitzkin's learning process shows chess students how pressure, honest review, tension, style, and deliberate practice can turn losses into better training.",
    "excerpt": "Josh Waitzkin's learning process turns chess improvement into a lesson in pressure, honest review, style, and deliberate practice.",
    "author": "Coach Chris",
    "publishedDate": "2026-05-22",
    "updatedDate": "2026-05-22",
    "canonicalPath": "#/blog/the-art-of-learning-chess",
    "featuredImage": "https://i.ytimg.com/vi/wAnDWfEIwoE/hqdefault.jpg",
    "imageAlt": "Andrew Huberman conversation thumbnail with Josh Waitzkin for a Horizon Chess article on the art of learning chess.",
    "audience": "Chess students, parents, developing competitors, and coaches who want a healthier training process around pressure, losses, and long-term improvement.",
    "sourceNote": "Source draft: the_art_of_learning_chess_expanded_blog.pdf. Source videos: The Art of Learning & Living Life | Josh Waitzkin from Andrew Huberman and Josh Waitzkin, The Art of Learning from hbkfilms on YouTube.",
    "source": "Coach Chris PDF draft informed by Josh Waitzkin source videos",
    "videos": [
      {
        "videoId": "wAnDWfEIwoE",
        "videoTitle": "The Art of Learning & Living Life | Josh Waitzkin",
        "videoUrl": "https://www.youtube.com/watch?v=wAnDWfEIwoE"
      },
      {
        "videoId": "lj1gxz5puaQ",
        "videoTitle": "Josh Waitzkin, The Art of Learning",
        "videoUrl": "https://www.youtube.com/watch?v=lj1gxz5puaQ&t=294s"
      }
    ],
    "summaryIntro": "Coach Chris takeaway: chess improvement is not only about knowing more moves. It is about noticing your habits under pressure and turning honest review into better training.",
    "sectionHeadings": [
      {
        "beforeParagraph": 0,
        "title": "The Art of Learning Chess",
        "note": "Start with chess as a mirror for how students think under pressure."
      },
      {
        "beforeParagraph": 5,
        "title": "Respect the Opponent's Plan",
        "note": "Shift from one-person chess to reading the other player's ideas."
      },
      {
        "beforeParagraph": 8,
        "title": "Weakness Becomes a Training Map",
        "note": "Turn vague struggles into specific chess habits that can be trained."
      },
      {
        "beforeParagraph": 12,
        "title": "Play Beyond Comfort",
        "note": "Use challenge to reveal the next layer of improvement."
      },
      {
        "beforeParagraph": 14,
        "title": "Street-Smart Chess and Classical Fundamentals",
        "note": "Blend practical fighting skill with disciplined chess foundations."
      },
      {
        "beforeParagraph": 17,
        "title": "Tension Is a Skill",
        "note": "Pause before trading just to make the position feel easier."
      },
      {
        "beforeParagraph": 21,
        "title": "Pressure Changes the Decision",
        "note": "Use Waitzkin's painful championship loss to discuss identity and emotion."
      },
      {
        "beforeParagraph": 25,
        "title": "Study the Painful Game",
        "note": "Find the critical position and the missing concept behind a loss."
      },
      {
        "beforeParagraph": 28,
        "title": "Defend Without Panic",
        "note": "Ask whether a threat is real before creating new weaknesses."
      },
      {
        "beforeParagraph": 31,
        "title": "Refine the Player's Style",
        "note": "Make a student's natural style more complete instead of erasing it."
      },
      {
        "beforeParagraph": 34,
        "title": "Process Still Needs Caring",
        "note": "Help students care about results without being defined by them."
      },
      {
        "beforeParagraph": 36,
        "title": "Use Engines After Human Analysis",
        "note": "Let students wrestle with the position before asking for the answer."
      },
      {
        "beforeParagraph": 38,
        "title": "Notice the In-Between",
        "note": "Train the transitions that create tactics, weak squares, and endgames."
      },
      {
        "beforeParagraph": 40,
        "title": "Training Needs Stress and Recovery",
        "note": "Replace unfocused grind with deliberate sessions and feedback."
      },
      {
        "beforeParagraph": 43,
        "title": "Review Games for Habits",
        "note": "Use post-game questions to turn errors into future behavior."
      },
      {
        "beforeParagraph": 46,
        "title": "What Parents and Coaches Should Protect",
        "note": "Keep chess serious, supportive, and free of adult-result pressure."
      },
      {
        "beforeParagraph": 48,
        "title": "A Waitzkin-Inspired Training Blueprint",
        "note": "Build a practical week from calculation, slow games, review, and reflection."
      },
      {
        "beforeParagraph": 50,
        "title": "The Board Teaches More Than Moves",
        "note": "Close with learning habits students can carry beyond chess."
      }
    ],
    "relatedSlugs": [
      "how-to-calculate-better-in-chess",
      "emotional-intelligence-in-chess-pressure",
      "chess-lessons-for-life-rasheme-ellington"
    ],
    "body": [
      "Chess is usually introduced as a game of rules: how the pieces move, how to checkmate, how to castle, how to win material, and how to avoid hanging your queen. Those basics matter, but they are only the surface. Once a student begins playing real games, chess becomes something deeper. It becomes a mirror.",
      "The board reflects how a player thinks under pressure. It reveals whether a student rushes when nervous, pauses before grabbing material, notices the opponent's plan, and recovers after making a mistake. That is why Josh Waitzkin's story matters for students. His path is not only the story of a talented kid who became strong. It is the story of someone who studied learning itself.",
      "Waitzkin's early chess life began in Washington Square Park, where practical fighters taught him the tactical and psychological side of the game. He later paired that experience with classical instruction built from endgames and positions of reduced complexity before carrying those ideas into messier positions.",
      "That combination matters. A student who only studies tactics can become dangerous but fragile. A student who only studies quiet principles can understand the game but lack practical fighting skill. Chess requires calculation and creativity, structure and chaos, discipline and imagination.",
      "A chess player does not only learn moves. A chess player learns how their own mind behaves when the position becomes uncomfortable.",
      "One of the first major changes in a chess student's development happens when the opponent stops looking like a prop. Beginners often play as if chess is a one-person activity. They search for their checks, captures, attacks, and ideas, then hope the other side cooperates.",
      "In a real game, the opponent is building plans too. A pawn move may open a diagonal. A knight move may aim at a fork. A quiet king move in an endgame may begin a winning opposition pattern. Even a move that looks harmless can carry a strategic point.",
      "The practical checkpoint is simple: before every move, ask what changed. The opponent spent time choosing that move. Try to say their idea in one sentence before deciding on yours.",
      "Chess is also a relentless truth teller. If a player panics under attack, trades too quickly, hates defending, or depends only on memorized openings, stronger opponents will eventually expose the weakness.",
      "That feedback can feel uncomfortable, but the board gives it without flattery or insult. It shows the consequence of the move. A weakness is not something to hide from forever; it is often the next training map.",
      "A player who says, \"I am bad at endgames,\" is still being vague. A player who says, \"I trade into pawn endings without counting king activity and outside passers,\" has found something trainable. The same goes for blunders: moving before checking the opponent's forcing moves is a habit a coach can help rebuild.",
      "Good improvement turns fuzzy frustration into a specific adjustment. That shift keeps students from treating a loss like a verdict on their talent.",
      "Players improve fastest when they are stretched. If a student only plays opponents they can beat easily, confidence may feel high while the flaws stay hidden. Comfort protects the ego and slows development.",
      "That does not mean every game should be a hopeless mismatch. Students need enough success to trust the process and enough serious challenge to see what must improve next. Tournament games, ladder games, and focused practice games make real habits visible.",
      "Waitzkin's chess education was not one-dimensional. The Washington Square Park side of chess taught traps, rhythm, pressure, deception, confidence, and battle. Classical training taught foundation, simplified positions, and the logic beneath the fight.",
      "Many students need both sides. A purely tactical student may love attacking but struggle when the position goes quiet. A purely positional student may understand long-term plans but miss immediate tactics. A student who memorizes openings may collapse when the opponent deviates.",
      "Endgames are especially useful because they reduce noise. With fewer pieces, students can see king activity, opposition, rook activity, passed pawns, tempi, and coordination more clearly. Those principles later reappear inside complicated middlegames.",
      "Tension is one of the most chess-specific learning skills in the draft. Tension appears when pawns or pieces are in contact but the position has not been resolved. A capture is possible, yet both players still have choices.",
      "Beginners often dislike tension because it feels unclear. Trading removes uncertainty. Capturing gives the brain relief. But emotional relief and good decision-making are not always the same thing.",
      "Before releasing tension, students should ask who benefits. Sometimes the capture is correct. Sometimes keeping the threat is stronger. Sometimes letting the opponent decide is the entire point.",
      "Imagine a center where a pawn capture is available immediately. Taking may win clarity, but it may also free the opponent's cramped pieces or simplify a problem they still needed to solve. Strong players become comfortable with unresolved positions long enough to improve the position first.",
      "A powerful example in Waitzkin's story is his final-round loss at the under-18 World Championship. At a critical moment his opponent offered a draw, and continuing the fight fit his identity as a player.",
      "The offer still changed the psychology of the moment. After declining, he chose an overaggressive path and lost. The lesson is not that fighting was automatically wrong. The lesson is that pressure changes how choices feel.",
      "Student games show the same pattern in smaller forms. A player attacks because defending feels exhausting. A player trades because nervousness wants the position to shrink. A player refuses a draw because pride says they should be winning. The move and the emotion are often tangled together.",
      "The critical position is not only on the board. It is also inside the player.",
      "Painful games are hard to study immediately. Waitzkin did not rush back into every painful loss the second it ended, and that human detail matters for coaches and parents.",
      "The danger is never returning. A painful game that stays ignored is only pain. A painful game that is studied becomes training. The best losses reveal more than a missed move; they reveal a missing concept.",
      "A useful post-game question is not only, \"What did the engine want?\" It is, \"Where did my understanding first drift away from the truth of the board?\"",
      "Another lesson is that not every attack should be met with panic-defense. Some attacks become dangerous because the defender creates the targets the attacker needs.",
      "Before weakening the king, ask whether the threat is real, what exactly is threatened, and whether a calm answer or counter-threat exists. A queen check in a beginner game should not automatically trigger every pawn in front of the king to move.",
      "That is not passive chess. It is disciplined chess. Courage is sometimes the refusal to overreact.",
      "Style matters too. Waitzkin describes the difficulty of being pulled away from his natural expression as an attacking player who loved the fight. Studying opposite styles has value, but a student should not lose their connection to the game in the process.",
      "A tactical player should learn positional chess without being shamed for loving tactics. A quiet player should learn attacking patterns without being forced into fake chaos. A fast player needs discipline. A careful player needs practical courage.",
      "Good teaching does not say, \"Stop being that kind of player.\" It asks how to make the student's natural style more complete.",
      "Adults often tell children that winning and losing do not matter. The intention is kind, but competitive students know results matter emotionally. They want to win, and caring gives the process weight.",
      "The healthier message is that winning matters and learning lasts longer. Parents and coaches can respect the disappointment of a loss while guiding the student toward the review that comes next.",
      "Modern students also face the temptation to get the answer too fast. Engines are excellent truth-checkers, but opening an engine before human analysis can short-circuit the struggle that builds calculation and judgment.",
      "A stronger sequence is to review without an engine, identify critical moments, write down the thoughts from the game, check the position afterward, and translate the engine answer into a human lesson.",
      "Waitzkin connects chess to other disciplines by paying attention to transitions. Beginners memorize fixed patterns: a fork, a weak king, an endgame setup. Stronger performers notice how one position becomes another.",
      "In chess, that means asking what each move left behind. Which defender moved? Which file opened? Which square weakened? Which exchange created the endgame? Skill lives in that in-between space.",
      "Training also needs rhythm. More hours are not automatically better hours. A tired student clicking through puzzles by guesswork may be reinforcing shallow habits rather than building depth.",
      "Focused work, feedback, and recovery belong together. Thirty deliberate minutes of calculation can be worth more than hours of unfocused blitz if the student actually sees candidate moves and the opponent's best defense.",
      "A high-value session might pair one serious game with two deeply reviewed critical moments. A high-value puzzle session asks the student to calculate a line before touching the solution.",
      "The best review system reveals thinking habits, not just tactical mistakes. After a serious game, students can describe how they felt, find the position where the game changed, and only then check concrete moves.",
      "Five review questions keep that process practical: What was my opponent's plan? Where did I feel pressure? What move changed the game? Was the mistake tactical, strategic, emotional, or time-related? What one habit will I train next?",
      "The final question changes future behavior. \"I need to blunder less\" is not a training goal. \"Before every move, I will check my opponent's checks, captures, and threats\" is trainable.",
      "Waitzkin's story also carries a warning for adults. High-pressure chess can build growth, but it can also overwhelm young players if adult pride becomes attached to every result.",
      "A healthy chess culture is serious without being fear-based. It holds students accountable without humiliating them, respects their desire to win, and teaches them to carry losses without letting losses define them.",
      "A practical training blueprint does not need to be complicated. It can include slow calculation, games long enough to create real decision pressure, engine-free review before computer checking, endgame principles, style work, and one sentence of reflection after a serious game.",
      "That balance helps students build a learning system instead of chasing random improvement. Calculation, slow games, review, endgames, and reflection each give the next lesson somewhere to land.",
      "The deeper lesson of Waitzkin's story is that chess is not only about becoming stronger at chess. It is about becoming stronger as a learner when the answer is not obvious.",
      "A player who loses, studies honestly, identifies the real pattern, and returns to the board with a better habit is practicing the true art of learning. Chess teaches responsibility, patience, self-awareness, tension, respect for the opponent's ideas, and the ability to turn failure into growth."
    ]
  },
{
    "slug": "how-to-calculate-better-in-chess",
    "category": "Chess Improvement / Chess Lessons",
    "tags": [
      "calculation",
      "tactics",
      "visualization",
      "candidate moves",
      "beginner chess",
      "middlegame"
    ],
    "title": "How to Calculate Better in Chess: A Practical Thinking System for Stronger Moves",
    "metaTitle": "How to Calculate Better in Chess: A Practical Thinking System for Stronger Moves",
    "metaDescription": "Learn how to calculate better in chess using candidate moves, checks, captures, attacks, visualization, defensive resources, and a simple blunder-check routine.",
    "excerpt": "A practical system for calculating stronger chess moves, avoiding blunders, and teaching students to think with purpose.",
    "author": "Coach Chris",
    "publishedDate": "2026-05-19",
    "updatedDate": "2026-05-19",
    "canonicalPath": "#/blog/how-to-calculate-better-in-chess",
    "featuredImage": "https://i.ytimg.com/vi/9Ga9dP3bvN8/hqdefault.jpg",
    "imageAlt": "GothamChess video thumbnail for a lesson on how to calculate better in chess.",
    "audience": "Beginner and intermediate chess students, parents, coaches, and players who want a clearer calculation routine.",
    "sourceNote": "Source video: How To Calculate In Chess, GothamChess, YouTube. The article uses the video as source inspiration and presents original lesson guidance for Horizon Chess students.",
    "source": "GothamChess calculation lesson",
    "videoId": "9Ga9dP3bvN8",
    "videoTitle": "How To Calculate In Chess",
    "videoUrl": "https://www.youtube.com/watch?v=9Ga9dP3bvN8",
    "summaryIntro": "Coach Chris takeaway: calculation is not magic. It is a repeatable thinking system students can practice one habit at a time.",
    "sectionHeadings": [
      {
        "beforeParagraph": 0,
        "title": "A Practical Thinking System for Stronger Moves",
        "note": "Start with why calculation is a thinking system, not a guessing contest."
      },
      {
        "beforeParagraph": 6,
        "title": "What Calculation Actually Means",
        "note": "Define calculation as looking ahead, testing replies, and evaluating the final position."
      },
      {
        "beforeParagraph": 12,
        "title": "The Beginner Goal: Minimize One-Move Damage",
        "note": "Focus students on preventing immediate piece losses before searching for brilliance."
      },
      {
        "beforeParagraph": 23,
        "title": "Use the Checklist: What Does My Opponent Want?",
        "note": "Build the habit of noticing threats before choosing your own plan."
      },
      {
        "beforeParagraph": 34,
        "title": "Start With Candidate Moves",
        "note": "Narrow the position to two or three serious options before calculating deeply."
      },
      {
        "beforeParagraph": 44,
        "title": "Checks, Captures, and Attacks Come First",
        "note": "Use forcing moves as the first anti-blunder and tactic-finding scan."
      },
      {
        "beforeParagraph": 53,
        "title": "Do Not Calculate Randomly: Find What the Position Is Asking For",
        "note": "Read the urgent features of the position so calculation stays relevant."
      },
      {
        "beforeParagraph": 58,
        "title": "Calculate Forcing Lines Before Quiet Lines",
        "note": "Calculate checks, captures, and attacks first because they limit replies."
      },
      {
        "beforeParagraph": 71,
        "title": "The Process: Find the Idea, Then Try to Prove It Wrong",
        "note": "Teach students to search for the defense that could refute their idea."
      },
      {
        "beforeParagraph": 82,
        "title": "Advanced Example 1: The Flashy Move That Fails One Defense",
        "note": "Use discipline to reject attractive moves when one defense breaks the tactic."
      },
      {
        "beforeParagraph": 88,
        "title": "Advanced Example 2: Escape Squares Can Change Everything",
        "note": "Track king escape squares and board geometry during forcing attacks."
      },
      {
        "beforeParagraph": 93,
        "title": "Advanced Example 3: A Candidate Move Can Be Correct to Reject",
        "note": "Show why some candidate moves are useful because they reveal what not to play."
      },
      {
        "beforeParagraph": 98,
        "title": "Advanced Example 4: When Theory Ends, Stay Solid and Keep Improving",
        "note": "Stay practical after opening theory instead of forcing moves that help the opponent."
      },
      {
        "beforeParagraph": 102,
        "title": "Advanced Example 5: Calculation in Closed Positions",
        "note": "Use calculation for timing, pawn breaks, and counterplay in quieter positions."
      },
      {
        "beforeParagraph": 108,
        "title": "Practice Visualization Like a Skill",
        "note": "Train the mental board with short, spoken lines before moving pieces."
      },
      {
        "beforeParagraph": 122,
        "title": "Pattern Recognition Makes Calculation Faster",
        "note": "Use familiar tactical shapes to guide calculation without replacing it."
      },
      {
        "beforeParagraph": 126,
        "title": "Find the Defense, Then Break the Defense",
        "note": "Respect the opponent's best resource, then look for the move that defeats it."
      },
      {
        "beforeParagraph": 138,
        "title": "How to Use This System During a Game",
        "note": "Apply a practical checklist before important moves."
      },
      {
        "beforeParagraph": 149,
        "title": "How to Teach This to Students",
        "note": "Teach calculation in levels so students know what to think about."
      },
      {
        "beforeParagraph": 158,
        "title": "Why Calculation Wins Games",
        "note": "Connect clearer calculation to fewer blunders, better tactics, and stronger decisions."
      },
      {
        "beforeParagraph": 167,
        "title": "Final Thought",
        "note": "End with the core habit: find what matters and calculate with purpose."
      }
    ],
    "relatedSlugs": [
      "chess-revolutionize-learning-cody-pomeranz",
      "chess-lessons-for-life-rasheme-ellington"
    ],
    "body": [
      "Chess games are not usually won by magic. They are won by better decisions.",
      "A lot of beginner and intermediate players think strong players simply \"see\" everything. They imagine that a master looks at the board and instantly knows the best move because of some natural gift. In reality, strong chess players usually have a thinking system. They organize the position, narrow down the important options, calculate the forcing lines, look for the opponent's best defense, and only then make a decision.",
      "That is what calculation really means.",
      "Calculation is not just thinking hard. It is not staring at the board until a move feels right. Good calculation is structured. You find the most promising moves, examine checks, captures, and attacks, test your idea against your opponent's best reply, and evaluate the final position honestly.",
      "This is one of the biggest differences between casual chess and serious chess. A casual player often looks for a move they like. A stronger player asks: What are my candidate moves? What is my opponent threatening? What happens if I force the position? What defense stops my idea?",
      "If you want to improve your chess, especially your tactics and decision-making, learning how to calculate properly is one of the most valuable skills you can build.",
      "In simple terms, calculation is the process of looking ahead. You choose a move, imagine your opponent's best response, continue the line for a few moves when necessary, evaluate the resulting position, then return to the original board and decide whether that move is worth playing.",
      "For advanced players, that may mean calculating a sharp king hunt, a sacrifice, or a long forcing sequence. For beginners, it often means something much simpler: do not hang a piece in one move.",
      "That may sound basic, but it is the foundation of everything. Before a player can calculate a seven-move attack, they need to notice that their queen is under attack. Before they can evaluate an endgame, they need to stop giving away knights, bishops, rooks, and pawns for free.",
      "So the first goal of calculation is not brilliance. The first goal is control.",
      "Before you search for a beautiful move, make sure you are not losing something immediately.",
      "Once that habit is built, calculation becomes more ambitious. You begin to find tactics, create threats, exploit weak squares, and convert small advantages. But the path starts with one simple question: what is happening right now?",
      "At beginner and lower-intermediate levels, most games are not decided by deep strategic concepts. They are decided by one-move mistakes.",
      "A piece is undefended. A queen is lined up with a rook. A knight can fork the king and queen. A back rank is weak. A bishop pins a defender. A capture removes the only piece protecting something important.",
      "This is why every student should learn to scan the board before moving. Not deeply, not perfectly, but consistently.",
      "The scan should begin with four questions:",
      "- What did my opponent's last move attack?",
      "- What pieces are undefended or barely defended?",
      "- Are either king or queen exposed?",
      "- Do I or my opponent have any immediate checks, captures, or attacks?",
      "This kind of thinking prevents disaster. A player may have a good opening, active pieces, and a better position, but if they forget that their bishop was defending the queen, the game can collapse instantly. Many players make a move because it creates a threat, but they forget what that piece was previously protecting.",
      "That is not a small detail. That is calculation.",
      "Every move changes the board. A piece that moves away from one square may stop defending another square. A queen that captures a pawn may abandon a bishop. A knight that jumps forward may leave a rook loose. When you calculate, you are not only asking where the piece goes. You are asking what responsibilities it leaves behind.",
      "The most useful calculation habit is also one of the simplest: before you focus on your own move, ask what your opponent wants.",
      "This single question changes everything. Instead of playing chess as if you are the only person with a plan, you start respecting the position. You notice threats earlier. You see defensive resources. You stop assuming the opponent will cooperate.",
      "A good checklist looks like this:",
      "1. What is my opponent threatening?",
      "2. Do they have any checks?",
      "3. Do they have any captures?",
      "4. Do they have any attacks on my queen, king, or loose pieces?",
      "5. If I make my intended move, what changes?",
      "This checklist is especially important after forcing moves. If your opponent checks you, do not automatically move your king. Sometimes you can block. Sometimes you can capture the checking piece. Sometimes you can trade queens. Beginners often move the king because that feels natural, but king moves are not always the strongest response.",
      "The same is true when your opponent attacks a piece. You do not always have to run away. Sometimes you have a stronger counterattack. Sometimes you can create a bigger threat. Sometimes the attacked piece is defended and the opponent's threat is not actually dangerous.",
      "Calculation begins when you stop reacting automatically and start asking what the position allows.",
      "The first step in calculation is not choosing a move. The first step is choosing which moves deserve your attention.",
      "These are called candidate moves.",
      "A candidate move is a move that looks reasonable enough to calculate. Instead of jumping into one random line, you create a short list of serious options. This keeps your thinking organized.",
      "In a tactical position, your candidate moves might be a check, a capture, a move that attacks the queen, a move that creates mate threats, or a quiet move that improves a piece. In a positional position, your candidate moves might be a pawn break, a piece improvement, a trade, or a move that stops your opponent's plan.",
      "The point is not to calculate every legal move. That would waste too much time. The point is to narrow the position down to the moves that actually matter.",
      "This is where many players go wrong. They look at one move, calculate it halfway, get confused, switch to another move, forget the first line, then burn five or ten minutes without making real progress. Their thoughts are moving, but they are not organized.",
      "Candidate moves prevent that.",
      "A practical question before every important move: What are my two or three most serious options?",
      "If none of your candidate moves work, that is not failure. That is information. You learned something about the position. Now you can return to the board and look for a better candidate move.",
      "Good calculation is often a loop: find candidates, calculate them, reject bad lines, improve the idea, calculate again, then choose.",
      "When calculating, the easiest moves to examine first are forcing moves. A forcing move limits the opponent's choices. The classic forcing categories are checks, captures, and attacks.",
      "- A check must be answered.",
      "- A capture changes the material balance.",
      "- An attack creates an urgent problem for the opponent.",
      "Not every check is good. Not every capture is correct. Not every attack is dangerous. But forcing moves must be examined because they can quickly change the position.",
      "This is also one of the best anti-blunder habits in chess. Before you make your move, ask: after I move, what are my opponent's checks, captures, and attacks?",
      "That one question can save you from hanging pieces, walking into mate, or missing a simple tactic.",
      "For example, you may see a pawn you can win. But if your queen is defending a bishop, and taking the pawn removes that defense, your opponent may have a check or capture that wins your queen. You were not wrong to look for material. You were wrong to ignore what changed after your move.",
      "Chess improvement often comes from catching those details before they punish you.",
      "One of the strongest ideas from practical calculation lessons is that you should not calculate randomly. You need to understand what the position is asking for.",
      "Is your king in danger? Is the opponent's queen lined up with your rook? Is there a loose piece? Is a defender overloaded? Is one side threatening mate? Are there weak squares around the king?",
      "This matters because calculation is not just about seeing moves. It is about seeing relevant moves.",
      "A beginner might calculate a random pawn move three moves deep while missing a simple check. A stronger player first identifies the urgent features of the position. If the king is exposed, checks matter more. If a piece is pinned, pressure on that piece matters more. If a defender is overloaded, captures and deflections matter more.",
      "This is why calculation should begin with a board scan. You are not trying to calculate everything. You are trying to calculate the moves that can hurt you, help you, or immediately change the evaluation.",
      "Not every move is equally easy to calculate.",
      "A quiet move can lead to many possible replies. A forcing move usually creates a smaller tree of options. That is why strong players often calculate forcing moves first. If a forcing move works, you may not need to spend time calculating slower ideas.",
      "Imagine you have a possible check. Your opponent may only have two legal responses. That is easier to calculate than a quiet improving move where the opponent can choose between ten different plans.",
      "When calculating a forcing line, move step by step:",
      "1. My move.",
      "2. Their forced reply.",
      "3. My next move.",
      "4. Their best defense.",
      "5. Final position.",
      "6. Evaluation.",
      "Do not stop after your own exciting move. Many players see a sacrifice and think it looks winning. But calculation does not end when your move looks impressive. It ends when you have tested the opponent's best defense.",
      "That is the difference between hope chess and real calculation.",
      "Hope chess says: I hope they miss it. Real calculation says: even if they find the best move, my idea still works.",
      "As you improve, calculation becomes less about spotting one-move tactics and more about testing ideas. This is where the process becomes important.",
      "The process is simple:",
      "1. Find an idea.",
      "2. Look for the opponent's strongest response.",
      "3. Find the negative verdict: the reason your idea might fail.",
      "4. If the problem can be fixed, fix it.",
      "5. If the problem cannot be fixed, abandon the idea.",
      "6. Compare the remaining candidate moves and choose.",
      "This is a huge step for intermediate players because many players only calculate for themselves. They see five attractive features in a move and ignore the one defensive resource that refutes it. But chess does not work by majority vote. If a move has five good points and one fatal flaw, the move fails.",
      "That is why strong players spend so much energy trying to prove themselves wrong. They do not just ask, \"What do I want?\" They ask, \"Why might this not work?\"",
      "This kind of thinking can feel negative at first, but it is actually freeing. Once you find the defensive resource, you no longer have to guess. Either the move works despite the defense, or it does not. In both cases, you have learned the truth about the position.",
      "One advanced attacking example from the calculation lesson shows a common practical problem: the spectacular move is tempting, but the simple move is stronger.",
      "In the position, the attacking player sees a dramatic queen sacrifice idea. The line appears to force the enemy king into a mating net. The rooks are ready to swing over, the king seems boxed in, and the attack looks irresistible.",
      "But proper calculation does not stop at the beautiful idea. The player asks how the opponent can interfere with the mating pattern. One defensive pawn move appears. The attacker adjusts the plan. Then another quiet defensive resource appears: the king may escape through a newly opened path.",
      "That one resource changes the verdict. The sacrifice may look brilliant, but if the king escapes, the entire combination fails.",
      "The lesson is not \"never sacrifice.\" The lesson is that a sacrifice must survive the opponent's best defense. If it does not, you should be disciplined enough to reject it and choose the simpler winning move.",
      "This is one of the hardest skills in chess: walking away from a move you want to play because your calculation tells you it does not work.",
      "Another advanced example involves a forcing king hunt where nearly every move is forced. These positions are calculation laboratories because the line is sharp, the king is exposed, and one tempo or one square can decide the game.",
      "The attacking side considers a sequence where a rook check drives the king into the open, a knight move builds a mating net, and the queen tries to give defensive checks from the side. The key question is not whether the attack looks dangerous. The key question is whether the king has an escape square.",
      "In one version of the position, the king can run through a light-square path and survive. In a slightly different version, one pawn controls the critical square, and the same line becomes winning. The entire evaluation changes because one escape square is available or unavailable.",
      "This is a major lesson for calculation: do not calculate only the attacking moves. Calculate the board geometry. Which squares are controlled? Which pieces participate in the mate? Which pieces are spectators? Which pawn controls the king's only path out?",
      "When you attack a king, your job is not just to give checks. Your job is to build a box. Every escape square matters.",
      "A high-level calculation example shows another important truth: sometimes the best calculation is the calculation that convinces you not to play a move.",
      "In the example, the player considers a natural pawn break. The move looks active because it fights for key squares and opens a useful diagonal. But the opponent has a precise sequence involving a knight move, a check, and a pawn sacrifice. After the line is calculated, the final position leaves the first player passive and tied down.",
      "That final evaluation matters. The candidate move did not lose immediately. It did not blunder a queen. It simply led to a position that was strategically uncomfortable. So the player rejected it and chose a more flexible move order.",
      "This is what advanced calculation often looks like. It is not always checkmate or material. Sometimes the question is: after all the forcing moves are over, whose pieces are active? Whose king is safer? Who controls the key file? Who has the easier plan?",
      "Intermediate players should learn from this. Do not evaluate a line only by counting pieces. Evaluate the position you are entering.",
      "In a practical blitz example, the position leaves opening theory and the player must calculate without a memorized line. This is where many players panic. They start forcing captures because they are unsure what else to do.",
      "A stronger approach is calmer. Ask what trades improve you and what trades improve your opponent. In the example, one capture would create an isolated weakness and activate the opponent's pieces. Even if it is legal and natural, it does not match the needs of the position. So it is rejected.",
      "Instead, the player focuses on simple improvements: preserve the bishop pair, gain queenside space, place pieces on better squares, and undermine the opponent's structure. Even after a pawn is lost in the practical flow of the game, the compensation comes from development, activity, and pressure.",
      "This is an important lesson for club players. Calculation does not always mean finding the most forcing move. Sometimes calculation tells you that the forcing move helps your opponent, while the quiet move keeps your advantage alive.",
      "The final type of advanced example is perhaps the most useful for real games: calculation in a closed or semi-closed position.",
      "In open tactical positions, checks and captures often guide you. In closed positions, calculation is more about plans. You monitor pawn breaks, weak squares, piece routes, and whether your opponent has a counterattack.",
      "In the example, the position is locked on one side, so the player shifts attention to the other side of the board. A pawn move by the opponent weakens key squares. The attacking player wants to open the bishop and create pressure with a pawn break, but first checks whether the opponent can create a dangerous counterplay move with check. After removing that tactical issue, the pawn break becomes possible.",
      "That is advanced calculation in a nutshell: not just \"can I attack,\" but \"can I prepare the attack so the opponent's counterplay does not work?\"",
      "Once the break happens, the position transforms. A closed board becomes open in the area where the attacker has more pieces. The rooks swing over, the bishop becomes stronger, and the opponent's weaknesses become targets.",
      "This example is useful because it shows that calculation is not only about tactics. It is also about timing. The same pawn break can be good or bad depending on whether the opponent has a check, a capture, or a counterattack.",
      "Calculation depends on visualization.",
      "In a real game, you cannot move the pieces around to test every idea. You have to move them in your mind. You need to imagine what the board will look like after two, three, or four moves.",
      "This is difficult at first. Many players lose track of pieces. They forget that a bishop moved. They imagine a knight on the wrong square. They calculate a line and then realize the move they wanted is illegal.",
      "That is normal. Visualization is not something you either have or do not have. It is a skill you train.",
      "Start small. Do not try to calculate eight moves deep right away. Begin with one move for you and one move for your opponent. Then build up to three-ply and four-ply calculation.",
      "A simple training method is:",
      "1. Set up a tactic.",
      "2. Look at the position without moving the pieces.",
      "3. Calculate your intended move and your opponent's reply.",
      "4. Say the final position out loud.",
      "5. Only then move the pieces or check the answer.",
      "For example, instead of clicking through a puzzle instantly, describe the line: \"My knight gives check, the king moves, then my queen wins the rook.\" This trains your brain to hold the position instead of guessing.",
      "Online tactics trainers can accidentally make players lazy because clicking is easy. To actually improve calculation, pause before moving. Try to see the full sequence first. Then enter the moves.",
      "The goal is not just to get the puzzle right. The goal is to strengthen the mental muscle of seeing future positions.",
      "Strong players calculate faster because they recognize patterns. They do not see every position as brand new. They recognize familiar tactical shapes: forks, pins, skewers, discoveries, back-rank weaknesses, overloaded defenders, and trapped pieces.",
      "This is why puzzle training matters. When you have seen a queen and bishop battery many times, you notice it faster. When you have seen a back-rank mate many times, you do not need to reinvent it. When you have seen a defender overloaded many times, your brain naturally asks whether that defender can be removed.",
      "Pattern recognition does not replace calculation. It guides calculation.",
      "A pattern tells you where to look. Calculation tells you whether the idea actually works.",
      "This may be the most important calculation habit of all: find your opponent's defense, then look for a way to break it.",
      "Many players only calculate their own attacking idea. They see a threat and assume it works. Stronger players ask how the opponent stops it.",
      "Suppose you want to attack the king. Before sacrificing, ask:",
      "- Can my opponent decline the sacrifice?",
      "- Can they trade queens?",
      "- Can they run away?",
      "- Can they block the attack?",
      "- Can they counterattack my king?",
      "- Can they return material to survive?",
      "Once you identify the defensive idea, your next job is to break it. Maybe the defender is overloaded. Maybe the escape square can be controlled. Maybe the blocking piece can be removed. Maybe the queen can be deflected. Maybe the defender has one resource, but you have an in-between move.",
      "This is where brilliant tactics often come from. Not from attacking blindly, but from respecting the opponent's best defense and finding the move that defeats it.",
      "If you cannot break the defense, the tactic may not work. That is valuable to know before you sacrifice material.",
      "Here is a practical calculation checklist you can use before making important moves:",
      "1. What changed after my opponent's last move? Did they create a threat, attack something, or leave something undefended?",
      "2. Is anything immediately dangerous? Check your king, queen, loose pieces, and back rank.",
      "3. What are my candidate moves? Choose two or three serious options instead of calculating random moves.",
      "4. Do I have checks, captures, or attacks? Calculate forcing moves first because they limit your opponent's choices.",
      "5. What is my opponent's best reply? Do not assume they will cooperate.",
      "6. What defense stops my idea? Find the defense before playing the move.",
      "7. Can I break that defense? Look for removal, deflection, overload, pins, forks, discoveries, or in-between moves.",
      "8. Evaluate the final position. After the line ends, ask who is better and why.",
      "9. Do one final blunder check. After I play this, what are my opponent's checks, captures, and attacks?",
      "The final blunder check is huge. Many players calculate their own idea correctly, then forget to check what the opponent can do immediately after. A calculation system should always end with safety.",
      "For students, I would teach calculation in levels rather than asking them to \"see deeper.\"",
      "Level 1 is safety. Before moving, ask whether the piece is safe and whether anything is hanging.",
      "Level 2 is the opponent's threat. Ask what the opponent's last move changed.",
      "Level 3 is forcing moves. Look for checks, captures, and attacks for both sides.",
      "Level 4 is candidate moves. Choose two or three serious options instead of guessing.",
      "Level 5 is best defense. Ask how the opponent would stop the idea.",
      "Level 6 is final evaluation. After the sequence ends, decide whether you are actually better.",
      "This makes calculation feel less mysterious. A beginner does not need to calculate like a grandmaster. They need to build habits in the right order.",
      "Do not tell students only to think harder. Teach them what to think about.",
      "Calculation is powerful because chess is concrete.",
      "General principles matter. You should develop your pieces, control the center, protect your king, and avoid weaknesses. But when tactics appear, concrete calculation becomes more important than general advice.",
      "A bad-looking move may work because of a tactic. A natural move may fail because of a hidden resource. A sacrifice may be correct because every defense loses. A quiet move may be strongest because it prepares an unavoidable threat.",
      "The board decides. Not appearances.",
      "That is why improving players should not only study openings. Openings can help you reach playable positions, but calculation helps you win those positions.",
      "If you calculate better, you will blunder less, spot tactics faster, convert advantages more cleanly, defend tougher positions, and make better decisions under pressure.",
      "You do not need to become a master overnight. Start with one habit: before every serious move, ask what the checks, captures, and attacks are for both sides.",
      "Then add candidate moves. Then add visualization. Then add defensive thinking. Over time, your calculation becomes less chaotic and more structured.",
      "And once your thinking becomes structured, chess stops feeling like random guessing. You begin to see the game more clearly.",
      "The goal of calculation is not to see everything. Nobody sees everything.",
      "The goal is to think clearly enough to find what matters.",
      "Start with the board scan. Ask what your opponent wants. Identify candidate moves. Calculate forcing options first. Respect the opponent's best defense. Train your visualization. Evaluate the final position honestly.",
      "That is how calculation becomes a weapon."
    ]
  }
];

const SCORE_GROWTH = [
  {
    label: "Student A",
    value: 118,
    growthLabel: "427 / Grade 2 to 545 / Grade 6",
  },
  {
    label: "Student B",
    value: 25,
    growthLabel: "Approx. 458 to 483 / Early 5",
  },
  {
    label: "Student C",
    value: 43,
    growthLabel: "Approx. 472 to 515 / Mid 5",
  },
];

const DIAGNOSTIC_GROWTH = [
  {
    label: "Student A",
    beforeScore: 427,
    afterScore: 545,
    beforeNote: "Grade 2",
    afterNote: "Grade 6",
  },
  {
    label: "Student B",
    beforeScore: 458,
    afterScore: 483,
    beforeNote: "Approx. 458",
    afterNote: "Early 5",
  },
  {
    label: "Student C",
    beforeScore: 472,
    afterScore: 515,
    beforeNote: "Approx. 472",
    afterNote: "Mid 5",
  },
];

const THINKING_SYSTEMS = [
  {
    title: "Emotional intelligence",
    items: [
      "Self-regulation",
      "Patience before acting",
      "Handling frustration",
      "Sportsmanship",
      "Resilience",
    ],
  },
  {
    title: "Calculative thinking",
    items: [
      "Planning ahead",
      "Evaluating consequences",
      "Pattern recognition",
      "Memory and recall",
      "Academic transfer",
    ],
  },
];

const ELO_GROWTH_PATH = [
  {
    label: "K-4 Beginner",
    value: 100,
    focus: "Board setup, legal moves, check, and basic mates.",
    cognitive: "Baseline",
  },
  {
    label: "End Grade 5",
    value: 400,
    focus: "Opening principles, simple tactics, and complete legal games.",
    cognitive: "+1 to +2",
  },
  {
    label: "End Grade 6",
    value: 650,
    focus: "Short combinations, explained plans, and appropriate clock use.",
    cognitive: "+2 to +3",
  },
  {
    label: "End Grade 7",
    value: 850,
    focus: "Tactical awareness, notation, and confident competition habits.",
    cognitive: "+3 to +5",
  },
  {
    label: "End Grade 8",
    value: 1000,
    focus: "Strategic planning, resilience, and peer leadership.",
    cognitive: "+4 to +6",
  },
];

const PUZZLE_ACCURACY = [
  { label: "Week 1", value: 35 },
  { label: "Week 4", value: 52 },
  { label: "Week 8", value: 64 },
  { label: "Week 12", value: 76 },
  { label: "Week 16", value: 84 },
];

const LEARNING_FLOW = [
  "Practice",
  "Fail safely",
  "Share solution",
  "Lift others",
  "Grow together",
];

const GOALS = [
  "Build fundamentals",
  "Prepare for tournaments",
  "Improve openings",
  "Review games",
  "Break a rating plateau",
  "Build confidence",
];

function getSiteBaseUrl() {
  if (typeof window === "undefined") return "";
  const path = window.location.pathname === "/" ? "" : window.location.pathname.replace(/\/$/, "");
  return `${window.location.origin}${path}`;
}

function getCanonicalUrl(page, blogPost) {
  const baseUrl = getSiteBaseUrl();
  if (blogPost?.canonicalPath) return `${baseUrl}/${blogPost.canonicalPath}`;
  return `${baseUrl}/#/${page || "home"}`;
}

function getAbsoluteImageUrl(imageUrl) {
  if (!imageUrl || /^https?:\/\//i.test(imageUrl)) return imageUrl;
  return `${getSiteBaseUrl()}${imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`}`;
}

function getBlogPostFromRoute(route) {
  const slug = route.replace(/^blog\//, "");
  return BLOG_POSTS.find((post) => post.slug === slug);
}

function getRelatedPosts(post) {
  return (post.relatedSlugs || [])
    .map((slug) => BLOG_POSTS.find((candidate) => candidate.slug === slug))
    .filter(Boolean);
}

function getBlogVideos(post) {
  if (post?.videos?.length) return post.videos;
  if (!post?.videoId) return [];

  return [
    {
      videoId: post.videoId,
      videoTitle: post.videoTitle,
      videoUrl: post.videoUrl,
    },
  ];
}

function getVideoThumbnail(video) {
  if (video?.thumbnail) return video.thumbnail;
  if (!video?.videoId) return "/horizon-logo.png";
  return `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`;
}

function getSectionHeading(post, paragraphIndex) {
  return post.sectionHeadings?.find((section) => section.beforeParagraph === paragraphIndex);
}

function slugifyText(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getSectionAnchor(post, section) {
  return `${post.slug}-${section.beforeParagraph}-${slugifyText(section.title)}`;
}

function formatDisplayDate(dateString) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${dateString}T00:00:00`));
}

function getPageFromHash() {
  if (typeof window === "undefined") return "home";
  const page = window.location.hash.replace(/^#\/?/, "") || "home";
  if (page === "why-horizon") return "success-stories";
  if (ROUTABLE_PAGES.some((item) => item.key === page)) return page;
  if (page.startsWith("blog/") && getBlogPostFromRoute(page)) return page;
  return "home";
}

function buildMailto(form, lesson, studentStatus) {
  const body = [
    `Student status: ${studentStatus === "returning" ? "Already a student" : "New student"}`,
    `Parent / guardian: ${form.parentName.trim()}`,
    `Student: ${form.studentName.trim() || "Not provided"}`,
    `Email: ${form.email.trim()}`,
    `Phone: ${form.phone.trim() || "Not provided"}`,
    `City: ${form.city.trim() || "Not provided"}`,
    `Student age: ${form.age || "Not provided"}`,
    `Experience: ${form.experience || "Not provided"}`,
    `Preferred lesson: ${lesson.title} (${lesson.price})`,
    `Goals: ${form.goals.length ? form.goals.join(", ") : "Not provided"}`,
    "",
    "Notes:",
    form.notes.trim() || "Not provided",
    "",
    "-",
    `Requested via ${BRAND_NAME} website`,
  ].join("\n");

  return `mailto:${encodeURIComponent(ZELLE_EMAIL)}?subject=${encodeURIComponent(
    DEFAULT_SUBJECT
  )}&body=${encodeURIComponent(body)}`;
}

function themeKoalendarFloatingButton() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const candidates = Array.from(document.querySelectorAll("a, button, div")).filter((el) => {
    const text = (el.textContent || "").trim().toLowerCase();
    if (!text) return false;
    const isFixed = window.getComputedStyle(el).position === "fixed";
    const isKoalendarLabel = text.includes("schedule a meeting") || text.includes("book lesson");
    return isFixed && isKoalendarLabel;
  });

  candidates.forEach((el) => {
    Object.assign(el.style, {
      background: "#2f7d83",
      backgroundColor: "#2f7d83",
      color: "#fffaf2",
      border: "1px solid rgba(18, 72, 76, 0.84)",
      borderRadius: "999px",
      boxShadow: "0 12px 26px rgba(20, 48, 52, 0.24)",
    });
  });
}

function openKoalendarPopup(url) {
  if (typeof window === "undefined") return;

  const koalendarReady =
    typeof window.Koalendar === "function" && window.__koalendarLoaded === true;

  if (koalendarReady) {
    try {
      window.Koalendar("widget", {
        url,
        text: "Schedule a meeting",
        shape: "rounded-full",
        backgroundColor: "#2f7d83",
        textColor: "#fffaf2",
        position: "bottom-right",
        icon: "calendar",
      });
      window.Koalendar("open", { url });
      window.setTimeout(themeKoalendarFloatingButton, 0);
      window.setTimeout(themeKoalendarFloatingButton, 180);
      return;
    } catch {
      // Fallback to direct navigation below.
    }
  }

  window.location.href = url;
}

function HorizonIcon({ className = "horizonIcon" }) {
  return <img className={className} src="/horizon-logo.png" alt="" aria-hidden="true" />;
}

function SocialIcon({ type }) {
  if (type === "youtube") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M21.2 7.2c-.2-.9-.9-1.6-1.8-1.8C17.8 5 12 5 12 5s-5.8 0-7.4.4c-.9.2-1.6.9-1.8 1.8C2.4 8.8 2.4 12 2.4 12s0 3.2.4 4.8c.2.9.9 1.6 1.8 1.8 1.6.4 7.4.4 7.4.4s5.8 0 7.4-.4c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8Z"
          fill="currentColor"
        />
        <path d="m10.2 14.9 4.8-2.9-4.8-2.9v5.8Z" fill="var(--deep)" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="4" y="4" width="16" height="16" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="16.8" cy="7.2" r="1.1" fill="currentColor" />
    </svg>
  );
}

function Header({ currentPage, navigateToPage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMenuOpen]);

  function navigateAndClose(page) {
    setIsMenuOpen(false);
    navigateToPage(page);
  }

  return (
    <header className="siteHeader">
      <div className="headerInner">
        <a
          className="brand"
          href="#/home"
          onClick={(event) => {
            event.preventDefault();
            navigateAndClose("home");
          }}
        >
          <span className="brandMark" aria-hidden="true">
            <HorizonIcon className="brandIcon" />
          </span>
          <span className="brandCopy">
            <span className="brandName">{BRAND_NAME}</span>
          </span>
        </a>

        <button
          className={isMenuOpen ? "menuToggle menuToggleOpen" : "menuToggle"}
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="primary-navigation" className={isMenuOpen ? "nav navOpen" : "nav"} aria-label="Primary navigation">
          {PAGES.map((page) => {
            const isActive = currentPage === page.key || currentPage.startsWith(`${page.key}/`);

            return (
              <a
                key={page.key}
                href={`#/${page.key}`}
                className={isActive ? "navLinkActive" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  navigateAndClose(page.key);
                }}
              >
                {page.label}
              </a>
            );
          })}
        </nav>

        <a
          className="headerCta"
          href="#/book"
          onClick={(event) => {
            event.preventDefault();
            navigateAndClose("book");
          }}
        >
          Book
        </a>
      </div>
      <button
        className={isMenuOpen ? "navBackdrop navBackdropOpen" : "navBackdrop"}
        type="button"
        aria-label="Close navigation menu"
        onClick={() => setIsMenuOpen(false)}
      />
    </header>
  );
}

function HomePage({ slideIdx, navigateToPage }) {
  return (
    <>
      <section className="heroStage pageView">
        <div className="heroMedia" aria-hidden="true">
          {SLIDES.map((src, index) => (
            <img
              key={src}
              className={index === slideIdx ? "heroImage heroImageActive" : "heroImage"}
              src={src}
              alt=""
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
            />
          ))}
        </div>

        <div className="heroShade" aria-hidden="true" />

        <div className="heroContent">
          <p className="eyebrow">Expand your chess horizon</p>
          <h1>Chess lessons that turn players into prodigies.</h1>
          <p className="heroLead">
            Coach Chris helps beginners and tournament players build clearer thinking, stronger
            habits, and a training plan that fits real life.
          </p>
          <div className="heroActions">
            <button className="btnPrimary" type="button" onClick={() => navigateToPage("book")}>
              Start booking
            </button>
            <button className="btnGhost" type="button" onClick={() => navigateToPage("blog")}>
              Read training guides
            </button>
          </div>
        </div>
      </section>

      <WhyHorizonPreview />
      <ArticlePreview navigateToPage={navigateToPage} />
      <CoachSection navigateToPage={navigateToPage} />
      <BookingSection />
    </>
  );
}

function WhyHorizonPreview() {
  return (
    <section className="contentWrap sectionBlock splitBlock">
      <div className="sectionIntro" data-reveal>
        <p className="eyebrow">Why Horizon</p>
        <h2>Students do not need more random chess advice. They need the right next move.</h2>
      </div>
      <div className="comparisonGrid">
        <article className="contrastPanel mutedPanel" data-reveal>
          <span className="panelIcon" aria-hidden="true"><HorizonIcon className="panelIconSvg" /></span>
          <h3>What usually stalls progress</h3>
          <p>
            Players jump between openings, puzzles, videos, and games without knowing which habit
            is costing them the most points.
          </p>
        </article>
        <article className="contrastPanel brightPanel" data-reveal style={{ "--reveal-delay": "90ms" }}>
          <span className="panelIcon" aria-hidden="true"><HorizonIcon className="panelIconSvg" /></span>
          <h3>How coaching fixes the loop</h3>
          <p>
            Lessons identify the actual bottleneck, give the student one focused assignment, and
            use game review to measure what changed.
          </p>
        </article>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="contentWrap sectionBlock processSection">
      <div className="sectionIntro narrowIntro" data-reveal>
        <p className="eyebrow">How lessons work</p>
        <h2>A simple three-step rhythm for skill building.</h2>
      </div>

      <div className="processGrid">
        {METHOD_STEPS.map((step, index) => (
          <article
            className="processCard"
            key={step.number}
            data-reveal
            style={{ "--reveal-delay": `${index * 90}ms` }}
          >
            <span>{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ArticlePreview({ navigateToPage }) {
  return (
    <section className="articleBand">
      <div className="contentWrap">
        <div className="sectionIntro articleIntro" data-reveal>
          <p className="eyebrow">Training articles</p>
          <h2>Chess improvement guides for students and parents.</h2>
          <p>
            These short resources give the page useful search-friendly content and create natural
            entry points for families looking for beginner chess lessons, game review, and
            tournament preparation.
          </p>
        </div>

        <div className="articleGrid">
          {ARTICLES.map((article, index) => (
            <article
              className="articleCard"
              key={article.title}
              data-reveal
              style={{ "--reveal-delay": `${index * 70}ms` }}
            >
              <div className="articleTag">{article.tag}</div>
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
              <ul>
                {article.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <button className="articleMoreButton" type="button" onClick={() => navigateToPage("blog")} data-reveal>
          Open the blog
        </button>
      </div>
    </section>
  );
}

function CoachSection({ navigateToPage }) {
  return (
    <section className="contentWrap sectionBlock coachSection">
      <div className="coachHeader" data-reveal>
        <img className="coachProfile" src="/images/coach-profile.jpg" alt="Coach Chris profile" loading="lazy" />
        <div>
          <p className="eyebrow">Meet Coach Chris</p>
          <h2>Calm instruction, honest feedback, and a step-by-step path.</h2>
          <p>
            Chris brings a patient, practical coaching style designed to help students build
            confidence and keep improving week after week. Every lesson is adapted to the student's
            level, goals, and learning style.
          </p>
          <button className="coachPageButton" type="button" onClick={() => navigateToPage("coach-chris")}>
            Meet Coach Chris
          </button>
        </div>
      </div>

      <div className="coachGallery">
        <figure data-reveal>
          <img src="/images/coach-classroom-1.jpg" alt="Students practicing chess in a classroom" loading="lazy" />
        </figure>
        <figure data-reveal style={{ "--reveal-delay": "80ms" }}>
          <img src="/images/coach-classroom-2.jpg" alt="Coach Chris teaching chess in a classroom" loading="lazy" />
        </figure>
        <figure data-reveal style={{ "--reveal-delay": "160ms" }}>
          <img src="/images/coach-chris-youth-champions.jpeg" alt="Young Coach Chris standing with Grandmaster Hikaru Nakamura" loading="lazy" />
        </figure>
      </div>

      <div className="coachNotes">
        <p data-reveal>
          Whether a student is just starting out or preparing for tournaments, the focus stays on
          clear fundamentals, thoughtful review, and training habits that are realistic to maintain.
        </p>
        <p data-reveal style={{ "--reveal-delay": "90ms" }}>
          Students can expect an encouraging environment, direct feedback, and a lesson plan that
          turns chess concepts into practical decisions at the board.
        </p>
      </div>
    </section>
  );
}

function PageHero({ eyebrow, title, body }) {
  return (
    <section className="pageHero pageView">
      <div className="contentWrap pageHeroInner" data-reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    </section>
  );
}

function BarChart({ data, max, suffix = "", ariaLabel }) {
  return (
    <div className="barChart" role="img" aria-label={ariaLabel}>
      {data.map((item, index) => (
        <div
          className="barRow"
          key={item.label}
          style={{ "--bar-delay": `${index * 70}ms` }}
        >
          <div className="barMeta">
            <span>{item.label}</span>
            <strong>
              {item.value}
              {suffix}
            </strong>
          </div>
          <div className="barTrack" aria-hidden="true">
            <span
              className="barFill"
              style={{ "--bar-width": `${Math.min((item.value / max) * 100, 100)}%` }}
            />
          </div>
          {item.growthLabel && <small className="barHoverNote">{item.growthLabel}</small>}
        </div>
      ))}
    </div>
  );
}

function DualLineChart({ data, min = 400, max = 560, ariaLabel }) {
  const width = 760;
  const height = 360;
  const padding = { top: 46, right: 52, bottom: 72, left: 62 };
  const plotHeight = height - padding.top - padding.bottom;
  const xBefore = padding.left + 82;
  const xAfter = width - padding.right - 126;
  const valueToY = (value) =>
    padding.top + plotHeight - ((value - min) / (max - min)) * plotHeight;
  const studentLines = data.map((item, index) => ({
    ...item,
    before: { x: xBefore, y: valueToY(item.beforeScore) },
    after: { x: xAfter, y: valueToY(item.afterScore) },
    className: `studentGrowthLine${index + 1}`,
  }));
  const gridLines = [400, 440, 480, 520, 560];

  return (
    <div className="dualLineChart" role="img" aria-label={ariaLabel}>
      <div className="chartLegend" aria-hidden="true">
        {data.map((student, index) => (
          <span key={student.label}><b className={`legendStudent${index + 1}`} />{student.label}</span>
        ))}
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
        {gridLines.map((line) => {
          const y = valueToY(line);
          return (
            <g key={line}>
              <line className="gridLine" x1={padding.left} x2={width - padding.right} y1={y} y2={y} />
              <text className="axisLabel" x={padding.left - 14} y={y + 4}>{line}</text>
            </g>
          );
        })}
        {studentLines.map((student) => {
          const tooltipX = Math.max(16, Math.min(student.after.x - 112, width - 238));
          const tooltipY = Math.max(14, student.after.y - 118);
          return (
            <g key={student.label} className={`studentGrowthLine ${student.className}`}>
              <line
                className="studentGrowthPath"
                x1={student.before.x}
                y1={student.before.y}
                x2={student.after.x}
                y2={student.after.y}
              />
              <circle className="studentBeforeDot" cx={student.before.x} cy={student.before.y} r="7" />
              <circle className="studentAfterDot" cx={student.after.x} cy={student.after.y} r="8" />
              <text className="linePointValue" x={student.before.x} y={student.before.y - 14}>{student.beforeScore}</text>
              <text className="linePointValue" x={student.after.x} y={student.after.y - 16}>{student.afterScore}</text>
              <text className="studentLineLabel" x={student.after.x + 18} y={student.after.y + 4}>{student.label}</text>
              <foreignObject className="linePointTooltip" x={tooltipX} y={tooltipY} width="224" height="104">
                <div className="lineTooltip">
                  <strong>{student.label}</strong>
                  <span>{student.beforeScore} to {student.afterScore}</span>
                  <p>{student.beforeNote} to {student.afterNote}</p>
                </div>
              </foreignObject>
            </g>
          );
        })}
        <text className="linePointLabel" x={xBefore} y={height - 26}>Initial score</text>
        <text className="linePointLabel" x={xAfter} y={height - 26}>Later score</text>
      </svg>
    </div>
  );
}

function LineChart({ data, max, suffix = "", ariaLabel }) {
  const width = 680;
  const height = 330;
  const padding = { top: 36, right: 28, bottom: 64, left: 58 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const points = data.map((item, index) => {
    const x = padding.left + (plotWidth / (data.length - 1)) * index;
    const y = padding.top + plotHeight - (item.value / max) * plotHeight;
    return { ...item, x, y };
  });
  const path = points.map((point) => `${point.x},${point.y}`).join(" ");
  const gridLines = [0, 0.25, 0.5, 0.75, 1];

  return (
    <div className="lineChart" role="img" aria-label={ariaLabel}>
      <svg viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
        {gridLines.map((line) => {
          const y = padding.top + plotHeight - line * plotHeight;
          return (
            <g key={line}>
              <line x1={padding.left} x2={width - padding.right} y1={y} y2={y} />
              <text x={padding.left - 14} y={y + 4}>
                {Math.round(max * line)}
                {suffix}
              </text>
            </g>
          );
        })}
        <polyline points={path} />
        {points.map((point) => {
          const tooltipX = Math.max(16, Math.min(point.x - 114, width - 244));
          const tooltipY = Math.max(12, point.y - 140);
          return (
            <g key={point.label} className="linePoint">
              <circle cx={point.x} cy={point.y} r="7" />
              <text className="linePointValue" x={point.x} y={point.y - 16}>
                {point.value}
                {suffix}
              </text>
              <text className="linePointLabel" x={point.x} y={height - 24}>
                {point.label}
              </text>
              {point.focus && (
                <foreignObject className="linePointTooltip" x={tooltipX} y={tooltipY} width="228" height="130">
                  <div className="lineTooltip">
                    <strong>{point.label}</strong>
                    <span>{point.value}{suffix || " Elo"}</span>
                    <p>{point.focus}</p>
                    <em>Cognitive growth: {point.cognitive}</em>
                  </div>
                </foreignObject>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function ProgramEvidenceSection({ className = "" } = {}) {
  return (
    <section className={`programEvidenceBand${className ? ` ${className}` : ""}`}>
      <div className="contentWrap">
        <div className="programEvidenceHeader" data-reveal>
          <p className="eyebrow">Program evidence</p>
          <h2>From the board to the classroom: Chess Skills translate to growing intelligence.</h2>
        </div>

        <div className="evidenceStory">
          <article className="evidencePanel evidencePanelIntro" data-reveal>
            <div className="evidenceCopy">
              <p className="eyebrow">Observed growth snapshot</p>
              <h3>Three Students showed growth in their Math and reading scores inside the classroom.</h3>
              <p>
                The portfolio tracks scale-score gains across three students, then compares their
                second diagnostic placement against the Grade 5 on-level band. The strongest case
                moved from a Grade 2 placement to a Grade 6 placement.
              </p>
            </div>
            <div className="nativeChartGrid singleChartGrid">
              <div className="chartCard" data-reveal style={{ "--reveal-delay": "80ms" }}>
                <div className="chartHeader">
                  <span>Chart 01</span>
                  <h4>Math diagnostic score increase</h4>
                  <p>Measurable math score growth since starting chess program</p>
                </div>
                <BarChart
                  data={SCORE_GROWTH}
                  max={120}
                  ariaLabel="Math diagnostic score increase: Student A gained 118, Student B gained 25, and Student C gained 43."
                />
              </div>
            </div>
          </article>

          <article className="evidencePanel diagnosticPanel" data-reveal>
            <div className="evidenceCopy">
              <p className="eyebrow">Official diagnostic case</p>
              <h3>Student A: a documented before-and-after view.</h3>
              <p>
                The strongest individual example moves from 427 to 545, while the same graph keeps
                the other sample students visible for comparison.
              </p>
            </div>
            <div className="chartCard fullChartCard diagnosticLineCard" data-reveal style={{ "--reveal-delay": "90ms" }}>
              <div className="chartHeader">
                <span>Growth graph</span>
                <h4>Math Diagnostic Growth</h4>
              </div>
              <DualLineChart
                data={DIAGNOSTIC_GROWTH}
                ariaLabel="Diagnostic growth graph comparing initial and later scores. Student A moves from 427 Grade 2 to 545 Grade 6. Student B moves from approximately 458 to 483 Early 5. Student C moves from approximately 472 to 515 Mid 5."
              />
            </div>
          </article>

          <article className="evidencePanel thinkingPanel" data-reveal>
            <div className="evidenceCopy">
              <p className="eyebrow">The habits chess trains</p>
              <h3>Chess instruction links emotional control with calculation.</h3>
              <p>
                The program positions chess as more than move memorization. Students practice
                pausing, regulating frustration, planning ahead, evaluating consequences, and
                transferring those habits into schoolwork.
              </p>
            </div>
            <div className="thinkingGrid">
              {THINKING_SYSTEMS.map((system, index) => (
                <div
                  className="thinkingCard"
                  key={system.title}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 80}ms` }}
                >
                  <h4>{system.title}</h4>
                  <ul>
                    {system.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>

          <article className="evidencePanel growthPathPanel" data-reveal>
            <div className="evidenceCopy">
              <p className="eyebrow">Long-term skill path</p>
              <h3>A beginner-to-Grade-8 model gives families a visible roadmap.</h3>
              <p>
                The portfolio projects chess skill growth from basic rules and mates toward
                strategic planning, competition habits, resilience, and peer leadership.
              </p>
            </div>
            <div className="chartCard fullChartCard" data-reveal style={{ "--reveal-delay": "90ms" }}>
              <div className="chartHeader">
                <span>Skill path</span>
                <h4>Projected chess skill growth</h4>
              </div>
              <LineChart
                data={ELO_GROWTH_PATH}
                max={1000}
                ariaLabel="Projected chess skill growth: 100 at K through fourth beginner, 400 at end of Grade 5, 650 at end of Grade 6, 850 at end of Grade 7, and 1000 at end of Grade 8."
              />
            </div>
          </article>

          <article className="evidencePanel practicePanel" data-reveal>
            <div className="evidenceCopy">
              <p className="eyebrow">Practice that compounds</p>
              <h3>Puzzle accuracy creates a simple way to see training habits improve.</h3>
              <p>
                The model shows puzzle accuracy rising from 35% in Week 1 to 84% by Week 16,
                paired with a collaborative learning rhythm students can repeat.
              </p>
            </div>
            <div className="practiceGrid">
              <div className="chartCard fullChartCard" data-reveal style={{ "--reveal-delay": "90ms" }}>
                <div className="chartHeader">
                  <span>Practice graph</span>
                  <h4>Once tactics becomes clear, puzzle accuracy becomes natural</h4>
                  <p>Modeled puzzle accuracy after 16 weeks</p>
                </div>
                <LineChart
                  data={PUZZLE_ACCURACY}
                  max={100}
                  suffix="%"
                  ariaLabel="Once tactics becomes clear, puzzle accuracy becomes natural: Week 1 at 35 percent, Week 4 at 52 percent, Week 8 at 64 percent, Week 12 at 76 percent, and Week 16 at 84 percent."
                />
              </div>
              <div className="learningFlow" aria-label="Collaborative learning flow">
                {LEARNING_FLOW.map((step, index) => (
                  <span
                    key={step}
                    data-reveal
                    style={{ "--reveal-delay": `${index * 55}ms` }}
                  >
                    <b>{String(index + 1).padStart(2, "0")}</b>
                    {step}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </div>

        <div className="programEvidenceNote" data-reveal>
          <b>Measurement note:</b> these figures are best read as observed diagnostic snapshots and
          program-fit evidence, not a claim that chess alone caused every point of growth.
        </div>
      </div>
    </section>
  );
}

const BLOG_SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
];

function BlogSortControl({ order, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const controlRef = useRef(null);
  const triggerRef = useRef(null);
  const selectedOption = BLOG_SORT_OPTIONS.find((option) => option.value === order) || BLOG_SORT_OPTIONS[0];

  useEffect(() => {
    if (!isOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      if (!controlRef.current?.contains(event.target)) setIsOpen(false);
    };

    const closeOnEscape = (event) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div className="blogOrderControl" ref={controlRef}>
      <span>Order</span>
      <div className={isOpen ? "blogOrderPicker isOpen" : "blogOrderPicker"}>
        <button
          className="blogOrderTrigger"
          type="button"
          ref={triggerRef}
          aria-label={`Article order: ${selectedOption.label}`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <b>{selectedOption.label}</b>
          <i className="blogOrderChevron" aria-hidden="true" />
        </button>
        {isOpen && (
          <div className="blogOrderMenu" role="listbox" aria-label="Article order options">
            {BLOG_SORT_OPTIONS.map((option) => {
              const isSelected = option.value === order;

              return (
                <button
                  className={isSelected ? "blogOrderOption isSelected" : "blogOrderOption"}
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                    triggerRef.current?.focus();
                  }}
                >
                  <span>{option.label}</span>
                  <i className="blogOrderCheck" aria-hidden="true" />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function BlogPage({ navigateToPage }) {
  const [blogQuery, setBlogQuery] = useState("");
  const [blogOrder, setBlogOrder] = useState("newest");
  const normalizedQuery = blogQuery.trim().toLowerCase();

  const visiblePosts = useMemo(() => {
    const sourceOrder = new Map(BLOG_POSTS.map((post, index) => [post.slug, index]));
    let result = [...BLOG_POSTS];

    if (normalizedQuery) {
      result = result.filter((post) => {
        const searchText = [
          post.title,
          post.description,
          post.excerpt,
          post.category,
          post.metaTitle,
          post.metaDescription,
          ...(post.tags || []),
          ...(post.sectionHeadings || []).map((section) => section.title),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchText.includes(normalizedQuery);
      });
    }

    result.sort((left, right) => {
      const leftDate = new Date(left.publishedDate).getTime();
      const rightDate = new Date(right.publishedDate).getTime();
      const dateOrder = leftDate - rightDate;

      if (dateOrder !== 0) return blogOrder === "oldest" ? dateOrder : -dateOrder;

      const sourceIndexOrder = sourceOrder.get(left.slug) - sourceOrder.get(right.slug);
      return blogOrder === "oldest" ? sourceIndexOrder : -sourceIndexOrder;
    });

    return result;
  }, [blogOrder, normalizedQuery]);

  return (
    <>
      <section className="articleBand pageArticleBand blogIndexBand">
        <div className="contentWrap">
          <div className="blogIndexToolbar">
            <p>
              <strong>{visiblePosts.length}</strong>{" "}
              {visiblePosts.length === 1 ? "article" : "articles"}
            </p>
            <div className="blogIndexControls">
              <label className="blogSearchControl">
                <span>Search articles</span>
                <input
                  type="search"
                  value={blogQuery}
                  onChange={(event) => setBlogQuery(event.target.value)}
                  placeholder="Search chess articles"
                />
              </label>
              <BlogSortControl order={blogOrder} onChange={setBlogOrder} />
            </div>
          </div>
          <div className="blogPostGrid">
            {visiblePosts.map((post) => (
              <article className="blogPostCard" key={post.slug}>
                <a
                  href={`#/blog/${post.slug}`}
                  onClick={(event) => {
                    event.preventDefault();
                    navigateToPage(`blog/${post.slug}`);
                  }}
                >
                  <img className="blogPostThumb" src={post.featuredImage} alt={post.imageAlt} loading="lazy" />
                  <div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                  </div>
                  <em>Read article</em>
                </a>
              </article>
            ))}
          </div>
          {visiblePosts.length === 0 && (
            <p className="blogEmptyState" role="status">
              No articles matched that search.
            </p>
          )}
        </div>
      </section>
      <BookStrip navigateToPage={navigateToPage} />
    </>
  );
}

function BlogPostPage({ post, navigateToPage }) {
  if (!post) return <BlogPage navigateToPage={navigateToPage} />;

  const relatedPosts = getRelatedPosts(post);
  const blogVideos = getBlogVideos(post);
  const primaryVideo = blogVideos[0];

  return (
    <>
      <article className="blogPostArticle">
        <div className="contentWrap blogPostReadableWrap">
          <button
            className="articleMoreButton blogBackButton blogArticleBackButton"
            type="button"
            onClick={() => navigateToPage("blog")}
          >
            Back to blog
          </button>

          <header className="blogPostHeroCard" data-reveal>
            <div className="blogPostHeroCopy">
              <h1>{post.title}</h1>
              <p>{post.excerpt}</p>
              <div className="blogPostByline" aria-label="Article details">
                <span>By {post.author}</span>
                <span>Published {formatDisplayDate(post.publishedDate)}</span>
                {post.updatedDate && <span>Updated {formatDisplayDate(post.updatedDate)}</span>}
              </div>
            </div>
            <figure className="blogPostHeroImage">
              {primaryVideo ? (
                <a
                  className="blogPostHeroImageLink"
                  href={primaryVideo.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Watch ${primaryVideo.videoTitle} on YouTube`}
                >
                  <img src={post.featuredImage} alt={post.imageAlt} />
                </a>
              ) : (
                <img src={post.featuredImage} alt={post.imageAlt} />
              )}
            </figure>
          </header>

          <div className="blogPostReadableGrid">
            <div className="blogPostBody">
              <p className="blogCoachTakeaway">{post.summaryIntro}</p>
              {post.body.map((paragraph, index) => {
                const heading = getSectionHeading(post, index);

                return (
                  <div className="blogParagraphBlock" key={`${post.slug}-${index}`}>
                    {heading && <h2 id={getSectionAnchor(post, heading)}>{heading.title}</h2>}
                    <p>{paragraph}</p>
                  </div>
                );
              })}
              <section className="blogInternalLinks" aria-labelledby={`${post.slug}-next-links`}>
                <h2 id={`${post.slug}-next-links`}>Keep exploring Horizon Chess</h2>
                <p>
                  If this topic connects with your student's goals, explore the{" "}
                  <a
                    href="#/success-stories"
                    onClick={(event) => {
                      event.preventDefault();
                      navigateToPage("success-stories");
                    }}
                  >
                    Success Stories
                  </a>{" "}
                  page or{" "}
                  <a
                    href="#/book"
                    onClick={(event) => {
                      event.preventDefault();
                      navigateToPage("book");
                    }}
                  >
                    book a lesson
                  </a>{" "}
                  to turn the idea into a practical training plan.
                </p>
                {relatedPosts.length > 0 && (
                  <div className="relatedPostLinks">
                    {relatedPosts.map((relatedPost) => (
                      <a
                        href={`#/blog/${relatedPost.slug}`}
                        key={relatedPost.slug}
                        onClick={(event) => {
                          event.preventDefault();
                          navigateToPage(`blog/${relatedPost.slug}`);
                        }}
                      >
                        {relatedPost.title}
                      </a>
                    ))}
                  </div>
                )}
              </section>
            </div>

            <nav className="blogPostMeta articleNotesPanel" data-reveal style={{ "--reveal-delay": "120ms" }} aria-label="Article notes">
              <span>Article notes</span>
              <p>Use these notes to jump directly to the clearest teaching points in this article.</p>
              <div className="articleNotesList">
                {post.sectionHeadings.map((section) => {
                  const anchor = getSectionAnchor(post, section);

                  return (
                    <a
                      href={`#${anchor}`}
                      key={anchor}
                      onClick={(event) => {
                        event.preventDefault();
                        document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                    >
                      <strong>{section.title}</strong>
                      <small>{section.note || "Jump to this useful section of the article."}</small>
                    </a>
                  );
                })}
              </div>
            </nav>
          </div>

          {blogVideos.length > 0 && (
            <section className="blogVideoLinks" data-reveal aria-labelledby={`${post.slug}-video-links`}>
              <div>
                <p className="eyebrow">Video companion</p>
                <h2 id={`${post.slug}-video-links`}>
                  {blogVideos.length === 1 ? "Watch the video" : "Watch the videos"}
                </h2>
              </div>
              <div className="blogVideoLinkGrid">
                {blogVideos.map((video) => (
                  <a className="blogVideoLinkCard" href={video.videoUrl} key={video.videoId} target="_blank" rel="noreferrer">
                    <img
                      className="blogVideoLinkThumb"
                      src={getVideoThumbnail(video)}
                      alt={`${video.videoTitle} video thumbnail`}
                      loading="lazy"
                    />
                    <span className="blogVideoLinkText">
                      <span>{video.videoTitle}</span>
                      <strong>Watch on YouTube</strong>
                    </span>
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
      <BookStrip navigateToPage={navigateToPage} />
    </>
  );
}

function SuccessStoriesPage({ navigateToPage }) {
  return (
    <>
      <ProgramEvidenceSection className="pageTopSection" />
      <WhyHorizonPreview />
      <ProcessSection />
      <section className="contentWrap sectionBlock splitBlock">
        <div className="sectionIntro" data-reveal>
          <p className="eyebrow">The difference</p>
          <h2>Lessons connect strategy, habits, and confidence instead of treating them separately.</h2>
        </div>
        <div className="comparisonGrid">
          <article className="contrastPanel mutedPanel" data-reveal>
            <span className="panelIcon" aria-hidden="true"><HorizonIcon className="panelIconSvg" /></span>
            <h3>Clear review</h3>
            <p>Students learn how to find the moment where a position changed, then practice the habit that would have helped.</p>
          </article>
          <article className="contrastPanel brightPanel" data-reveal style={{ "--reveal-delay": "90ms" }}>
            <span className="panelIcon" aria-hidden="true"><HorizonIcon className="panelIconSvg" /></span>
            <h3>Practical homework</h3>
            <p>Each lesson ends with a focused assignment that can fit into a real week without overwhelming the student.</p>
          </article>
        </div>
      </section>
      <BookStrip navigateToPage={navigateToPage} />
    </>
  );
}

function CoachChrisPage({ navigateToPage }) {
  return (
    <>
      <section className="contentWrap sectionBlock coachBioSection pageTopSection">
        <article className="coachBioCopy coachBioWrapArticle" data-reveal>
          <figure className="coachBioPhoto coachBioInlinePhoto coachBioInlinePhotoLeft">
            <span className="coachBioImageTint">
              <img src="/images/coach-chris-trophy-lesson.jpeg" alt="Coach Chris with a young chess student holding a tournament trophy" />
            </span>
          </figure>

          <p className="eyebrow">Coach Chris</p>
          <div className="coachBioTitleRow">
            <h2>Coach Chris, National Champion, Making learning to be one, simple, fun and exciting.</h2>
            <img className="coachBioTitleProfile" src="/images/coach-profile.jpg" alt="Coach Chris profile" />
          </div>
          <p>
            Hi, I'm Coach Chris, a former national chess champion who has been playing chess since
            2005. Chess has been a major part of my life for nearly three decades, shaping the way I
            think, compete, teach, and approach challenges. Learning from some of the best of the
            best how to be a better player, and a better person in my life and duties.
          </p>
          <p>
            Over the years, I have learned that chess is much more than memorizing openings or
            finding tactics. At its core, chess is about decision-making. Every move asks a player to
            slow down, evaluate the position, understand the opponent's ideas, manage pressure, and
            make the best choice with the information available. That is the same mindset I try to
            build in my students.
          </p>

          <figure className="coachBioPhoto coachBioInlinePhoto coachBioInlinePhotoRight">
            <span className="coachBioImageTint">
              <img src="/images/coach-news.jpg" alt="Bx. kids chess kings newspaper clipping about youth chess success" />
            </span>
          </figure>

          <p>
            As a coach, my goal is to make chess clear, structured, and enjoyable. I help students
            understand not just what move to play, but why that move makes sense. My lessons focus on
            tactics, strategy, calculation, opening principles, endgames, pattern recognition,
            emotional control, and practical tournament skills.
          </p>

          <p>
            I believe every student can improve when they are taught with patience, structure, and
            purpose. Some students need help learning the basics. Others need to sharpen their
            competitive instincts. Some need to slow down and stop blundering. Others need to build
            confidence after losses. My job is to meet students where they are and help them take the
            next step.
          </p>
          <p>
            Chess teaches focus, discipline, resilience, creativity, and accountability. Whether a
            student wants to compete in tournaments or simply become a stronger thinker, I want them
            to leave each lesson more confident, more curious, and more prepared than when they
            started.
          </p>
        </article>

        <div className="coachBioCards">
          <article className="processCard" data-reveal>
            <span>01</span>
            <h3>Think Before You Move</h3>
            <p>Students learn a simple process for checking threats, finding tactics, and avoiding rushed mistakes.</p>
          </article>
          <article className="processCard" data-reveal style={{ "--reveal-delay": "80ms" }}>
            <span>02</span>
            <h3>Build Real Understanding</h3>
            <p>Lessons connect openings, plans, piece activity, and endgames so students understand why moves work.</p>
          </article>
          <article className="processCard" data-reveal style={{ "--reveal-delay": "160ms" }}>
            <span>03</span>
            <h3>Compete With Composure</h3>
            <p>Students practice staying patient, handling pressure, and making confident decisions in real games.</p>
          </article>
        </div>
      </section>
      <BookStrip navigateToPage={navigateToPage} />
    </>
  );
}

function BookStrip({ navigateToPage }) {
  return (
    <section className="bookStrip">
      <div className="contentWrap bookStripInner" data-reveal>
        <div>
          <p className="eyebrow">Ready for the next step?</p>
          <h2>Send intake details or book your next lesson.</h2>
        </div>
        <button className="btnPrimary" type="button" onClick={() => navigateToPage("book")}>
          Open booking page
        </button>
      </div>
    </section>
  );
}

function BookingSection() {
  const [studentStatus, setStudentStatus] = useState("new");
  const [selectedKey, setSelectedKey] = useState(LESSONS[0].key);
  const [form, setForm] = useState({
    parentName: "",
    studentName: "",
    email: "",
    phone: "",
    city: "",
    age: "",
    experience: "",
    goals: [],
    notes: "",
  });

  const selectedLesson = LESSONS.find((lesson) => lesson.key === selectedKey) || LESSONS[0];

  function updateForm(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function toggleGoal(goal) {
    setForm((current) => {
      const exists = current.goals.includes(goal);
      return {
        ...current,
        goals: exists ? current.goals.filter((item) => item !== goal) : [...current.goals, goal],
      };
    });
  }

  function submitInquiry(event) {
    event.preventDefault();
    if (!form.parentName.trim() || !form.email.trim()) {
      alert("Please enter a parent name and email.");
      return;
    }
    window.location.href = buildMailto(form, selectedLesson, studentStatus);
  }

  return (
    <section className="bookingSection">
      <div className="contentWrap">
        <div className="bookingHeader" data-reveal>
          <p className="eyebrow">Book a lesson</p>
          <h2>Tell Coach Chris what you are working on, or book directly if you already study here.</h2>
          <p>
            New students can send intake details first. Returning students can unlock the lesson
            buttons and open the matching Koalendar popup.
          </p>
        </div>

        <div className="studentPathWrap" data-reveal>
          <div className="studentPath">
            <button
              type="button"
              className={studentStatus === "new" ? "pathButton pathButtonActive" : "pathButton"}
              aria-pressed={studentStatus === "new"}
              onClick={() => setStudentStatus("new")}
            >
              <span>New student</span>
              <strong>Send intake details first</strong>
            </button>
            <button
              type="button"
              className={studentStatus === "returning" ? "pathButton pathButtonActive" : "pathButton"}
              aria-pressed={studentStatus === "returning"}
              onClick={() => setStudentStatus("returning")}
            >
              <span>Already a student</span>
              <strong>Show lesson booking options</strong>
            </button>
          </div>

          <div className="bookingChoiceNudge" role="status">
            <span>{studentStatus === "returning" ? "Direct booking unlocked" : "Existing student?"}</span>
            <p>
              {studentStatus === "returning"
                ? "Choose the lesson card below and schedule through Koalendar."
                : "Use the Already a student option to reveal direct lesson booking buttons."}
            </p>
          </div>
        </div>

        <div className="bookingLayout">
          <form className="bookingForm" onSubmit={submitInquiry} data-reveal style={{ "--reveal-delay": "70ms" }}>
            <div className="fieldGrid">
              <label>
                Parent name *
                <input
                  value={form.parentName}
                  onChange={(event) => updateForm("parentName", event.target.value)}
                  placeholder="Parent or guardian"
                />
              </label>
              <label>
                Student name
                <input
                  value={form.studentName}
                  onChange={(event) => updateForm("studentName", event.target.value)}
                  placeholder="Student name"
                />
              </label>
              <label>
                Email *
                <input
                  value={form.email}
                  onChange={(event) => updateForm("email", event.target.value)}
                  placeholder="you@example.com"
                  type="email"
                />
              </label>
              <label>
                Phone
                <input
                  value={form.phone}
                  onChange={(event) => updateForm("phone", event.target.value)}
                  placeholder="+1"
                />
              </label>
              <label>
                City
                <input
                  value={form.city}
                  onChange={(event) => updateForm("city", event.target.value)}
                  placeholder="City or online"
                />
              </label>
              <label>
                Student age
                <select value={form.age} onChange={(event) => updateForm("age", event.target.value)}>
                  <option value="">Select age</option>
                  {Array.from({ length: 17 }, (_, index) => index + 5).map((age) => (
                    <option value={`${age}`} key={age}>
                      {age} years old
                    </option>
                  ))}
                </select>
              </label>
              <label className="wideField">
                Experience
                <select
                  value={form.experience}
                  onChange={(event) => updateForm("experience", event.target.value)}
                >
                  <option value="">Select experience</option>
                  <option>Brand new to chess</option>
                  <option>Beginner, unrated</option>
                  <option>Rated under 800</option>
                  <option>Rated 800-1200</option>
                  <option>Rated 1200+</option>
                  <option>Tournament player</option>
                </select>
              </label>
            </div>

            <fieldset className="goalPicker">
              <legend>Goals</legend>
              <div className="goalGrid">
                {GOALS.map((goal) => (
                  <label key={goal} className={form.goals.includes(goal) ? "goalChip goalChipActive" : "goalChip"}>
                    <input
                      type="checkbox"
                      checked={form.goals.includes(goal)}
                      onChange={() => toggleGoal(goal)}
                    />
                    {goal}
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="notesField">
              Notes
              <textarea
                value={form.notes}
                onChange={(event) => updateForm("notes", event.target.value)}
                placeholder="Current rating, goals, recent tournament plans, preferred schedule, or anything Coach Chris should know."
                rows={5}
              />
            </label>

            <button className="btnSecondary" type="submit">
              Send intake details
            </button>
          </form>

          {studentStatus === "returning" ? (
            <LessonPanel
              selectedLesson={selectedLesson}
              selectedKey={selectedKey}
              setSelectedKey={setSelectedKey}
            />
          ) : (
            <aside className="bookingHintPanel bookingPanelPop">
              <span>Returning families</span>
              <p>
                Select <b>Already a student</b> above when you are ready to reopen the lesson
                options and schedule directly through Koalendar.
              </p>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}

function LessonPanel({ selectedLesson, selectedKey, setSelectedKey }) {
  return (
    <aside className="lessonPanel bookingPanelPop" aria-label="Lesson booking options">
      <div className="selectedLesson">
        <span>{selectedLesson.eyebrow}</span>
        <h3>{selectedLesson.title}</h3>
        <p>{selectedLesson.format}</p>
        <strong>{selectedLesson.price}</strong>
      </div>

      <div className="lessonOptions">
        {LESSONS.map((lesson) => (
          <button
            type="button"
            key={lesson.key}
            className={selectedKey === lesson.key ? "lessonOption lessonOptionActive" : "lessonOption"}
            onClick={() => setSelectedKey(lesson.key)}
          >
            <span>{lesson.eyebrow}</span>
            <strong>{lesson.title}</strong>
            <em>{lesson.price}</em>
          </button>
        ))}
      </div>

      <ul className="selectedBullets">
        {selectedLesson.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>

      <button
        type="button"
        className="btnPrimary bookingButton"
        onClick={() => openKoalendarPopup(selectedLesson.koalendarUrl)}
      >
        Schedule selected lesson
      </button>

      <p className="paymentNote">
        Payment is finalized through Zelle at <b>{ZELLE_EMAIL}</b>.
      </p>
    </aside>
  );
}

function ConsultationModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  function submitConsultation(event) {
    event.preventDefault();
    const trimmedEmail = email.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!isValidEmail) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      window.localStorage.setItem("horizon-consultation-email", trimmedEmail);
      window.sessionStorage.setItem(CONSULTATION_STORAGE_KEY, "true");
    } catch {
      // Storage can fail in private browsing; the confirmation should still work.
    }

    setError("");
    setSubmitted(true);
  }

  function closeModal() {
    try {
      window.sessionStorage.setItem(CONSULTATION_STORAGE_KEY, "true");
    } catch {
      // Ignore storage failures and close normally.
    }
    onClose();
  }

  return (
    <div className="consultationOverlay" role="presentation">
      <section
        className="consultationModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-title"
      >
        <button className="consultationClose" type="button" onClick={closeModal} aria-label="Close consultation popup">
          x
        </button>

        {submitted ? (
          <div className="consultationSuccess">
            <p className="eyebrow">Consultation request received</p>
            <h2 id="consultation-title">Check your inbox soon.</h2>
            <p>
              Thanks for sharing your email. Coach Chris will follow up with consultation details
              and next steps for getting started.
            </p>
            <button className="btnPrimary" type="button" onClick={closeModal}>
              Continue to site
            </button>
          </div>
        ) : (
          <form className="consultationForm" onSubmit={submitConsultation}>
            <p className="eyebrow">Free consultation</p>
            <h2 id="consultation-title">Get a consultation email from Coach Chris.</h2>
            <p>
              Enter your email and receive a short note about lesson options, student fit, and how
              to choose the right next step.
            </p>

            <label>
              Email address
              <input
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                }}
                placeholder="parent@example.com"
                type="email"
                autoFocus
              />
            </label>

            {error && <span className="consultationError">{error}</span>}

            <div className="consultationActions">
              <button className="btnPrimary" type="submit">
                Send consultation email
              </button>
              <button className="consultationSkip" type="button" onClick={closeModal}>
                Not now
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}

export default function App() {
  const [slideIdx, setSlideIdx] = useState(0);
  const [pageReady, setPageReady] = useState(false);
  const [currentPage, setCurrentPage] = useState(getPageFromHash);
  const [consultationOpen, setConsultationOpen] = useState(false);

  function navigateToPage(page) {
    window.history.pushState(null, "", `#/${page}`);
    setCurrentPage(page);
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  useEffect(() => {
    const loader = window.setTimeout(() => setPageReady(true), 650);
    return () => window.clearTimeout(loader);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSlideIdx((index) => (index + 1) % SLIDES.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const syncPage = () => setCurrentPage(getPageFromHash());
    window.addEventListener("popstate", syncPage);
    window.addEventListener("hashchange", syncPage);
    return () => {
      window.removeEventListener("popstate", syncPage);
      window.removeEventListener("hashchange", syncPage);
    };
  }, []);

  useEffect(() => {
    const blogPost = currentPage.startsWith("blog/") ? getBlogPostFromRoute(currentPage) : null;
    const canonicalUrl = getCanonicalUrl(currentPage, blogPost);
    const imageUrl = getAbsoluteImageUrl(blogPost?.featuredImage || "/horizon-logo.png");
    const pageTitle = blogPost
      ? `${blogPost.metaTitle} | ${BRAND_NAME}`
      : currentPage === "blog"
        ? `Horizon Chess Blog | ${BRAND_NAME}`
        : `${BRAND_NAME} | Private Online and In-Person Chess Lessons`;
    const pageDescription = blogPost
      ? blogPost.metaDescription
      : "Horizon Chess offers private chess coaching, school-focused chess education, and lesson paths for beginners, tournament players, and returning students.";
    const pageType = blogPost ? "article" : "website";
    const managedSelector = '[data-managed-seo="true"]';

    document.querySelectorAll(managedSelector).forEach((node) => node.remove());

    function upsertMeta(selector, attribute, attributeValue, content) {
      let meta = document.querySelector(selector);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, attributeValue);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    }

    function addManagedMeta(attribute, attributeValue, content) {
      if (!content) return;
      const meta = document.createElement("meta");
      meta.setAttribute(attribute, attributeValue);
      meta.setAttribute("content", content);
      meta.setAttribute("data-managed-seo", "true");
      document.head.appendChild(meta);
    }

    function addManagedLink(rel, href) {
      const link = document.createElement("link");
      link.setAttribute("rel", rel);
      link.setAttribute("href", href);
      link.setAttribute("data-managed-seo", "true");
      document.head.appendChild(link);
    }

    document.title = pageTitle;
    upsertMeta('meta[name="description"]', "name", "description", pageDescription);
    upsertMeta('meta[name="author"]', "name", "author", blogPost?.author || BRAND_NAME);
    upsertMeta('meta[property="og:title"]', "property", "og:title", pageTitle);
    upsertMeta('meta[property="og:description"]', "property", "og:description", pageDescription);
    upsertMeta('meta[property="og:type"]', "property", "og:type", pageType);
    upsertMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    upsertMeta('meta[property="og:image"]', "property", "og:image", imageUrl);
    upsertMeta(
      'meta[property="og:image:alt"]',
      "property",
      "og:image:alt",
      blogPost?.imageAlt || `${BRAND_NAME} chess logo`
    );
    addManagedMeta("name", "twitter:card", "summary_large_image");
    addManagedMeta("name", "twitter:title", pageTitle);
    addManagedMeta("name", "twitter:description", pageDescription);
    addManagedMeta("name", "twitter:image", imageUrl);
    addManagedMeta("name", "twitter:image:alt", blogPost?.imageAlt || `${BRAND_NAME} chess logo`);
    addManagedLink("canonical", canonicalUrl);

    const existingStructuredData = document.getElementById("blog-structured-data");
    if (!blogPost) {
      existingStructuredData?.remove();
      return;
    }

    addManagedMeta("property", "article:author", blogPost.author);
    addManagedMeta("property", "article:published_time", blogPost.publishedDate);
    addManagedMeta("property", "article:modified_time", blogPost.updatedDate || blogPost.publishedDate);
    addManagedMeta("property", "article:section", blogPost.category);
    blogPost.tags.forEach((tag) => addManagedMeta("property", "article:tag", tag));

    const blogVideos = getBlogVideos(blogPost);
    const structuredData = existingStructuredData || document.createElement("script");
    structuredData.id = "blog-structured-data";
    structuredData.type = "application/ld+json";
    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blogPost.metaTitle,
      description: blogPost.metaDescription,
      image: [imageUrl],
      datePublished: blogPost.publishedDate,
      dateModified: blogPost.updatedDate || blogPost.publishedDate,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonicalUrl,
      },
      url: canonicalUrl,
      author: {
        "@type": "Person",
        name: blogPost.author,
      },
      publisher: {
        "@type": "Organization",
        name: BRAND_NAME,
        logo: {
          "@type": "ImageObject",
          url: getAbsoluteImageUrl("/horizon-logo.png"),
        },
      },
      articleSection: blogPost.category,
      keywords: blogPost.tags,
      about: blogPost.tags,
      isBasedOn: blogVideos.map((video) => video.videoUrl),
    });
    if (!existingStructuredData) document.head.appendChild(structuredData);
  }, [currentPage]);

  useEffect(() => {
    if (!pageReady || currentPage !== "home") return undefined;

    let hasSeenConsultation = false;
    try {
      hasSeenConsultation = window.sessionStorage.getItem(CONSULTATION_STORAGE_KEY) === "true";
    } catch {
      hasSeenConsultation = false;
    }

    if (hasSeenConsultation) return undefined;

    const timer = window.setTimeout(() => {
      setConsultationOpen(true);
    }, 700);

    return () => window.clearTimeout(timer);
  }, [currentPage, pageReady]);

  useEffect(() => {
    if (!consultationOpen) return undefined;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [consultationOpen]);

  useEffect(() => {
    themeKoalendarFloatingButton();
    const observer = new MutationObserver(() => {
      themeKoalendarFloatingButton();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    const timer = window.setInterval(themeKoalendarFloatingButton, 1200);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const items = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!items.length) return undefined;

    items.forEach((item) => item.classList.remove("is-visible"));

    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [currentPage]);

  return (
    <div className="page">
      <div className={pageReady ? "introLoader introLoaderHidden" : "introLoader"} aria-hidden="true">
        <div className="loaderGlyph"><HorizonIcon className="loaderIcon" /></div>
        <div className="loaderText">Setting the board...</div>
      </div>

      <Header currentPage={currentPage} navigateToPage={navigateToPage} />

      <main>
        {currentPage === "home" && <HomePage slideIdx={slideIdx} navigateToPage={navigateToPage} />}
        {currentPage === "blog" && <BlogPage navigateToPage={navigateToPage} />}
        {currentPage.startsWith("blog/") && (
          <BlogPostPage post={getBlogPostFromRoute(currentPage)} navigateToPage={navigateToPage} />
        )}
        {currentPage === "success-stories" && <SuccessStoriesPage navigateToPage={navigateToPage} />}
        {currentPage === "coach-chris" && <CoachChrisPage navigateToPage={navigateToPage} />}
        {currentPage === "book" && <BookingSection />}
      </main>

      <footer className="footer">
        <div className="contentWrap footerInner">
          <nav className="footerSocials" aria-label="Social links">
            {SOCIAL_LINKS.map((link) => (
              <a key={link.label} href={link.href} aria-label={link.label} title={link.label} target="_blank" rel="noreferrer">
                <SocialIcon type={link.icon} />
              </a>
            ))}
          </nav>
          <div className="footerBrand">
            <span>© {new Date().getFullYear()} {BRAND_NAME}</span>
            <a href={`mailto:${ZELLE_EMAIL}`}>{ZELLE_EMAIL}</a>
          </div>
        </div>
      </footer>

      <ConsultationModal isOpen={consultationOpen} onClose={() => setConsultationOpen(false)} />
      <Analytics />
    </div>
  );
}
