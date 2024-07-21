const { command, isPrivate } = require("../../lib");
const plugins = require("../../lib/plugins");

command(
  {
    pattern: "menu",
    fromMe: true,
    desc: "Show menu with buttons",
    usage: "#menu",
    type: "message",
  },
  async (message, match, m) => {
    let menuData = {
      jid: message.jid,
      button: [], 
      header: {
        title: "My Bot",
        subtitle: "Interactive Menu",
        hasMediaAttachment: false,
      },
      footer: {
        text: "Choose an option",
      },
      body: {
        text: "Welcome to the menu!",
      },
    };

    let commands = plugins.commands.filter(
      (cmd) => !cmd.dontAddCommandList && cmd.pattern instanceof RegExp
    );
    let sections = [];
    let currentSection = null;

    commands.forEach((cmd) => {
      let cmdName = cmd.pattern.toString().split(/W+/)[1];
      let cmdType = cmd.type ? cmd.type.toLowerCase() : "misc";
      if (cmdType !== currentSection) {
        currentSection = cmdType;
        sections.push({
          title: cmdType.toUpperCase(),
          rows: [],
        });
      }
      sections[sections.length - 1].rows.push({
        header: cmdName,
        title: cmdName,
        description: cmd.desc || "No description",
        id: _${cmdName},
      });
      menuData.button.push({
        type: "reply",
        params: {
          display_text: Click  ${cmdName} command,
          id: _${cmdName},
        },
      });
    });
    menuData.button.unshift({
      type: "list",
      params: {
        title: "Menu Options",
        sections: sections,
      },
    });

    return await message.sendMessage(message.jid, menuData, {}, "interactive");
  }
);
