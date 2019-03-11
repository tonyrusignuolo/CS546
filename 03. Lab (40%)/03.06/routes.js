const express = require("express");
const router = express.Router();

router.get("/about", async (req, res) => {
	try {
		const about = {
			name: "Anthony Rusignuolo",
			cwid: 10374903,
			biography: "I am a 24 year old coastal Jersey native. I grew up skateboarding and playing video games. I went to Keyport High School. I did my bachelor's in civil engineering at Stevens, and I'm wrapping up my master's here as well.\n I've branched out from primarily skating as a kid to skimboarding, surfing, and snowboarding. I've also found things I'm very passionate about and backed them with a foundation and purpose, as opposed to the simple hobbies I grew up on. I enjoy travelling and eating plants. My neck is longer than most and my offspring will likely benefit from that, as they will be able to reach vegetation that the shorter children cannot.",
			favoriteShows: ["Game of Thrones", "Community", "Stranger Things"],
			hobbies: ["skateboarding", "snowboarding", "surfing", "skimboarding"]
		}
		res.json(about);
	} catch (err) {
		res.status(500).send();
	}
})

router.get("/story", async (req, res) => {
	try {
		const story = {
			storyTitle: "Fresh Prince of Bel Air",
			story: "Now, this is a story all about how My life got flipped-turned upside down And I'd like to take a minute Just sit right there I'll tell you how I became the prince of a town called Bel Air In west Philadelphia born and raised On the playground was where I spent most of my days Chillin' out maxin' relaxin' all cool And all shootin some b-ball outside of the school When a couple of guys who were up to no good Started making trouble in my neighborhood I got in one little fight and my mom got scared She said 'You're movin' with your auntie and uncle in Bel Air' I begged and pleaded with her day after day But she packed my suit case and sent me on my way She gave me a kiss and then she gave me my ticket. I put my Walkman on and said, 'I might as well kick it'. First class, yo this is bad Drinking orange juice out of a champagne glass. Is this what the people of Bel-Air living like? Hmm this might be alright. But wait I hear they're prissy, bourgeois, all that Is this the type of place that they just send this cool cat? I don't think so I'll see when I get there I hope they're prepared for the prince of Bel-Air Well, the plane landed and when I came out There was a dude who looked like a cop standing there with my name out I ain't trying to get arrested yet I just got here I sprang with the quickness like lightning, disappeared I whistled for a cab and when it came near The license plate said fresh and it had dice in the mirror If anything I could say that this cab was rare But I thought 'Nah, forget it' - 'Yo, homes to Bel Air' I pulled up to the house about seven or eigth And I yelled to the cabbie 'Yo homes smell ya later' I looked at my kingdom I was finally there To sit on my throne as the Prince of Bel Air"
		}
		res.json(story);
	} catch (err) {
		res.status(500).send();
	}
})

router.get("/education", async (req, res) => {
	try {
		const education = [{
				schoolName: "Union Beach Preschool",
				degree: "Preschool Diploma",
				favoriteClass: "Spanish",
				favoriteMemory: "I fondly remember making a throne out of the big blue blocks, but sitting on it doesn't really stick out to me."
			},
			{
				schoolName: "Memorial School",
				degree: "K-8",
				favoriteClass: "Algebra",
				favoriteMemory: "Every morning in class, I would turn around to my friend, who's is apparently resistant to conditioning, and grab the first thing I would see on his desk, usually his calculator. Still mess with him about it today."
			},
			{
				schoolName: "Keyport High School",
				degree: "High School Diploma",
				favoriteClass: "Metal Shop",
				favoriteMemory: "My advisor is still a good friend of mine and really supported me through the process of applying for college. I cherish the day I told her I got accepted to Stevens."
			},
			{
				schoolName: "Stevens Institute of Technology",
				degree: "Bachelor's Of Engineering",
				favoriteClass: "CS115",
				favoriteMemory: "I made some great friends senior year and towards the end they threw me a surprise party for my birthday! I'll never forget it! Much love, Liz!"
			}
		]
		res.json(education);
	} catch (err) {
		res.status(500).send();
	}
})

const constructorMethod = app => {
	app.use("/", router);
	app.use("*", (req, res) => {
		res.redirect("/about");
	});
};

module.exports = constructorMethod;