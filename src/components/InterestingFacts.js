import { useEffect, useMemo, useState } from 'react';

const facts = [
  {
    title: 'R2-D2 once spoke English, and was kind of a jerk.',
    text: `
The R2-D2 we all know and love speaks only in beeps and whistles, a robot language that most of his friends can understand. But in the original draft of Star Wars, written in 1974, R2-D2 spoke in complete sentences.
Even more alarming, he was not the lovable goof he would later become. He was actually kind of a bully, berating his pal C-3PO with insults like, "You're a mindless, useless philosopher," and "You're nothing more than a dim-witted, emotion-brained intellectual. Why you were created is beyond my logic systems." Sheesh, take the hostility down a notch, will ya?`,
  },
  {
    title:
      'The original Return of the Jedi ending saw Luke Skywalker turn evil.',
    text: `
The original trilogy ends on a happy note. The Dark Side is defeated and all of our favorite characters survive. But, according to J.W. Rinzler's behind-the-scenes tell-all The Making of Star Wars: The Return of the Jedi, the seminal tome about how Episode VI was made, that wasn't the original idea.

In early story meetings, writer-director George Lucas considered an ending for Return of the Jedi that was much, much darker. As he pitched it to co-writer Lawrence Kasdan, "Luke takes his mask off. The mask is the very last thing—and then Luke puts it on and says, 'Now I am Vader.' Surprise! The ultimate twist. 'Now I will go and kill the [Rebel] fleet and I will rule the universe.'"

Kasdan loved the idea, telling his boss, "That's what I think should happen." But Lucas ultimately decided to go a different way, feeling like Luke going evil was a bit too dark since his franchise "is for kids."`,
  },
  {
    title: 'Yoda was almost a monkey.',
    text: `
    Long before Yoda was created with animatronics and puppetry, by master Muppeteer Frank Oz, the plan was to hire an actual actor… a simian actor, that is. According to The Making of Star Wars: Empire Strikes Back, they planned to dress up a real monkey in a Yoda costume and mask. There are photos of the monkey in training and the weirdly hideous Yoda mask prototype.
    Luckily, a crew member who'd previously worked on 2001: A Space Odyssey pointed out that the apes used in that movie's opening were a huge headache, which was enough to convince Empire's filmmakers to fire their Yoda monkey.`,
  },
  {
    title:
      'Carrie Fisher slapped Oscar Isaac more than 40 times…on the first day of shooting.',
    text: `
    Poe Dameron (Oscar Isaac) goes against General Leia Organa's (Carrie Fisher) orders in The Last Jedi, but not without consequence. Isaac revealed in an interview with Stephen Colbert that the scene in which Leia demotes Poe was a difficult one to get right, leading to the late actress slapping the younger star more than 40 times. What an honor.`,
  },
  {
    title: 'Boba Fett first appeared in a country fair parade.',
    text: `
    Most people believe that legendary bounty hunter Boba Fett first appeared in 1980's The Empire Strikes Back. But hardcore fans know it happened a little earlier, in the much-maligned Star Wars Holiday Special in 1978—and they'd be wrong, too. His history goes back a little further.

    The first time anyone set eyes on Boba Fett was on September 24, 1978, during the San Anselmo Country Fair parade in California. The townspeople were only lucky enough to get an advance look at what would become one of Star Wars' most loved baddies because they shared a zip code with 52 Park Way, the original headquarters of Lucasfilm.`,
  },
  {
    title: 'Samuel L. Jackson had his lightsaber engraved with a bad word.',
    text: `
    While doing an interview on BBC's The Graham Norton Show, Samuel L. Jackson insisted that he still owned the purple lightsaber that his character, Mace Windu, used in some pretty epic battles in the Star Wars prequels. But the most shocking revelation? What Jackson claimed was engraved on his lightsaber, which is not suitable for young children.

    Any longtime follower of Jackson's career could probably guess it, though. As you may recall, back in 1994, Jackson appeared in Quentin Tarantino's Pulp Fiction, where he played an enlightened hitman named Jules Winnfield whose wallet is embroidered with the same words.`,
  },
  {
    title: 'The original Darth Vader is banned from all Star Wars events.',
    text: `
    When we think of Darth Vader, the first name that comes to mind is James Earl Jones, the voice behind the series' most infamous villain. But the man in the costume was somebody entirely different, a British bodybuilder named David Prowse. And Prowse apparently isn't among Lucas's favorite people.

    As Prowse revealed on his website (which has since been taken down), he has been banned from all "Lucasfilm associated events," which includes conventions and other Star Wars celebrations. When he reached out for an explanation, Prowse said he was told "that I have 'burnt too many bridges between Lucasfilm and myself'—no other reason given." Lucas declined to elaborate, but rumors abound about the rift, with many believing that Prowse was a bit too vocal about his displeasure in learning that another actor, Sebastian Shaw, would be used for the Vader unmasking scene.`,
  },
  {
    title: 'Adam Driver recorded his last lines as Kylo Ren in his own closet.',
    text: `
    According to Matthew Wood, sound editor on The Rise of Skywalker, changes to the script came in so late that he had to travel to the home of Adam Driver, who played villain Kylo Ren throughout the latest trilogy, to record him delivering a few new and necessary lines in a rather low-tech place. "I ended up opening up one of his closets where he had all of his suits, and I just pushed the suits out of the way and said, 'hang your head in here,'" Wood said on the SoundWorks Collection podcast, per The Week.`,
  },
  {
    title: 'The first Star Wars almost caused an actual war.',
    text: `
    To create the barren desert planet of Tatooine, Lucas found the perfect setting in Tunisia. What he didn't account for was how even a little movie production could lead to socio-political tensions. Tunisia shares a border with Libya, which, at the time, was ruled by dictator Muammar Gaddafi. Reportedly, the Tunisian government received threats from Gaddafi, warning that a conflict was inevitable if they didn't remove a military vehicle from the Libyan border.

    The "military vehicle" in question was actually a Jawa Sandcrawler. Lucas agreed to move the prop because, well, inciting an international incident isn't a great way to publicize a movie.`,
  },
  {
    title: 'Chewbacca had to be protected from bear hunters.',
    text: `
    Compared with the snowy tundras and barren deserts the Star Wars cast and crew had to endure, filming in the Redwood forests of Northern California, to create the forest moon of Endor for Return of the Jedi, must have been a cakewalk. Except for actor Peter Mayhew, who played Chewbacca. During the several-month shoot, he had to be constantly chaperoned by bodyguards in bright vests, to protect him from hunters. That's because, in costume, Mayhew could've easily been mistaken for a bear.

    But more hilariously, the bodyguards had to protect the actor from people searching the forest for Bigfoot—yes, that Bigfoot, the mythical, ape-like creature that's rumored to be hiding somewhere in the Pacific Northwest. We might be inclined to believe this was just another tall tale, but Mayhew himself actually confirmed the story on Reddit.`,
  },
  {
    title: 'Sir Alec Guinness, who played Obi-Wan, hated Star Wars.',
    text: `
    The great actor Sir Alec Guinness was accustomed to performing Shakespeare before he signed on to play Obi-Wan Kenobi. And, according to many accounts, he hated it. In a letter to friends, as obtained by Mashable, Guinness complained that "new rubbish dialogue reaches me every other day on wages of pink paper—and none of it makes my character clear or even bearable."

    What's more, in an anecdote shared in his autobiography, A Positively Final Appearance, Guinness recalls meeting a young fan who asked for an autograph and claimed he'd seen Star Wars a hundred times. He agreed to give the child an autograph, but only if he never watched the movie again. "He bursted into tears," Guinness wrote. "I just hope the lad, now in his thirties, is not living in a fantasy world of secondhand, childish banalities."`,
  },
  {
    title:
      'There are several direct references to The Godfather throughout the franchise.',
    text: `
    George Lucas is good friends with Francis Ford Coppola and worked on The Godfather. You can see the influence of that film in a few different aspects of Star Wars, starting with Han and Jabba's working relationship, which has an organized crime flavor. But maybe the most evocative visual reference to the mafia classic is in Return of the Jedi, when Leia strangles Jabba with her chain. This mirrors the death of Luca Brasi (Lenny Montana)—a connection that was very deliberate, according to the official Star Wars site.`,
  },

  {
    title: 'Nobody says the word "Ewok" at any point in Return of the Jedi.',
    text: `Go rewatch the movie if you don't believe us! Not once in the entirety of Return of the Jedi does anybody say "Ewok." The name is used in the script—a stage direction reads, "A strange little furry face with huge black eyes comes slowly into view. The creature is an EWOK, by the name of WICKET"—but that's it!

    So, how did we all walk out of theaters knowing that those creatures were called Ewoks? The toys of the era confirmed the name, but it sure did seem like everybody was talking about Ewok long before we were buying the toys. (Somebody solve this mystery before we lose our minds!)`,
  },
  {
    title: "Chewbacca's voice is a mixture of badger, lion, seal, and walrus.",
    text: `When a Wookiee growls, it sounds like something both familiar and utterly unique. That's the feat of sound designer Ben Burtt, who had to come up with a voice for Chewbacca that wasn't just a recording of an angry bear.

    "[Chewbacca] didn't have articulated lips," Burtt once recalled. "He could basically open and close his mouth. So you also needed to create a sound which would be believable coming from a mouth that was operated like his." Burtt ended up mixing together the howls and roars of a couple of different creatures, including badgers, lions, seals, and even a walrus from Long Beach, California. That unique bellow has become so iconic that there are even YouTube tutorials, which have attracted millions of views, where you can get a step-by-step guide on how to talk like Chewy.`,
  },
];

const InterestingFacts = () => {
  const [num, setNum] = useState(0);
  const factsCount = useMemo(() => facts.length, []);

  useEffect(() => {
    setTimeout(() => {
      setNum((num + 1) % factsCount);
    }, 90000);
  }, [num, factsCount]);

  return (
    <div className='jumbotron'>
      <h3>{facts[num].title}</h3>
      <p style={{ fontSize: 16 }}>{facts[num].text}</p>
    </div>
  );
};

export default InterestingFacts;
