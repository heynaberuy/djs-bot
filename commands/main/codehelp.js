const error = require("../../utils/error.js");
const { MessageEmbed } = require('discord.js');

const javascriptLessons = ["Introduction", "Basics", "Chrome Developer tools", "Intro to HTML and CSS", "Variables", "Operators", "Control flow", "Functions", "Callbacks", "Intro Node", "Intro NPM", "Object Orientated"]
const cssLessons = ["Basics", "Why CSS exists", "syntax", "Selectorss", "inheritance", "priority", "color units", "size units", "reset", "text", "font family", "font style", "line height", "font shorthand", "text properties", "box model", "background", "display", "overflow", "border", "padding", "margin", "size shorthand", "positioning", "float clear", "advanced", "pseudoclasses", "gradients", "transistions", "animations", "transform", "responsiveness"]
const HTMLLessons = []
const sassLessons = []

module.exports = {
  name: "codehelp",
  description: "Helps you with code",
  help: "Get help with coding",
  expArgs: "<language> <level>",
  async execute(client, message, Discord) {
    try {
      const html_emoji = client.emojis.cache.get("843196462337622087");
      const CSS_emoji = client.emojis.cache.get("843203296038092822");
      const javascript_emoji = client.emojis.cache.get("843196462329364490");

      const selectorembed = new MessageEmbed()

        .setTitle("Code Tutorial")
        .setDescription("Select a language to start learning!")
        .addField("Options:", `<:html5:843196462337622087> HTML \n <:css:843203296038092822> CSS \n <:js:843196462329364490>  Javascript \n <:sass:843472543423135744> SASS`)
        .setFooter("You have 1 minute to react!")

      message.channel.send(selectorembed).then(async embed => {
        await embed.react(html_emoji);
        await embed.react(CSS_emoji);
        await embed.react(javascript_emoji);
        await embed.react("<:sass:843472543423135744>");

        const htmlfilter = (reaction, user) => {
          return reaction.emoji === html_emoji && !user.bot;
        };

        const htmlcollector = embed.createReactionCollector(htmlfilter, { time: 60000 });

        htmlcollector.on('collect', (reaction, user) => {
          const newEmbed = new MessageEmbed()
            .setTitle("HTML Selected")
            .setDescription("Please fill in the number of the lesson you would like to start.")
          newEmbed.addField("Lessons", "**1:** variables\n")
          embed.edit({ embed: newEmbed })
        })

        //CSS
        const CSSfilter = (reaction, user) => {
          return reaction.emoji === CSS_emoji && !user.bot;
        };

        const CSScollector = embed.createReactionCollector(CSSfilter, { time: 60000 });

        CSScollector.on('collect', (reaction, user) => {
          const newEmbed = new MessageEmbed()
            .setTitle("CSS Selected")
            .setDescription("Please fill in the number of the lesson you would like to start.")
          for (csslesson of cssLessons) {
            newEmbed.addField(`${cssLessons.indexOf(csslesson) + 1}:`, `${csslesson}`)
          }
          embed.edit({ embed: newEmbed })
        })

        //JAVASCRIPT
        const javascriptfilter = (reaction, user) => {
          return reaction.emoji === javascript_emoji && !user.bot;
        };

        const javascriptcollector = embed.createReactionCollector(javascriptfilter, { time: 60000 });

        javascriptcollector.on('collect', (reaction, user) => {
          const newEmbed = new MessageEmbed()
            .setTitle("JavaScript Selected")
            .setDescription("Please fill in the number of the lesson you would like to start.")
            .addField("Lessons", "\*\*1:\*\* variables\n")
          embed.edit({ embed: newEmbed })
        })
      }).catch(e => error.send("Error:" + e.stack));

    } catch (e) {
      error.send("Errors:" + e.stack)
    }
  },
}