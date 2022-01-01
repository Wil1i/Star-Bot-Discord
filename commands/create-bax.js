const config = require("../config.json");
const { Permissions } = require("discord.js");

module.exports = {
  name: "create-bax",
  description: "Create a bax",
  permissions: ["ADMINISTRATOR"],
  async execute(client, message) {
    // create-bax name
    const messageArry = message.content.split(" ");
    if (!messageArry[1])
      return message.reply(`>>> ${config.bot.prefix}${this.name} [name]`);

    let familyChat;
    const name = message.content.replace(`${messageArry[0]} `, "");
    const msg = await message.channel.send(
      `>>> Dar hale sakhtane bax **${name}**`
    );
    message.guild.roles.create({ name: name }).then((r) => {
      const permissions = [
        { id: message.guild.roles.everyone, deny: [Permissions.FLAGS.CONNECT] },
        { id: "921858429071528006", deny: [Permissions.FLAGS.VIEW_CHANNEL] },
        { id: "921858441327300688", deny: [Permissions.FLAGS.VIEW_CHANNEL] },
        { id: "921858618259832962", deny: [Permissions.FLAGS.VIEW_CHANNEL] },
        { id: "921858628879786014", deny: [Permissions.FLAGS.VIEW_CHANNEL] },
        { id: "922104326896381992", deny: [Permissions.FLAGS.VIEW_CHANNEL] },

        {
          id: "921858423195308113",
          allow: [
            Permissions.FLAGS.MANAGE_CHANNELS,
            Permissions.FLAGS.MANAGE_MESSAGES,
          ],
        },

        {
          id: "921858432057880647",
          allow: [
            Permissions.FLAGS.VIEW_CHANNEL,
            Permissions.FLAGS.MANAGE_CHANNELS,
            Permissions.FLAGS.MUTE_MEMBERS,
            Permissions.FLAGS.MOVE_MEMBERS,
            Permissions.FLAGS.CONNECT,
          ],
        },

        {
          id: "921858433949528064",
          allow: [
            Permissions.FLAGS.VIEW_CHANNEL,
            Permissions.FLAGS.MANAGE_CHANNELS,
            Permissions.FLAGS.MUTE_MEMBERS,
            Permissions.FLAGS.MOVE_MEMBERS,
          ],
        },

        {
          id: "923340846823268433",
          allow: [
            Permissions.FLAGS.VIEW_CHANNEL,
            Permissions.FLAGS.MOVE_MEMBERS,
            Permissions.FLAGS.MUTE_MEMBERS,
          ],
        },

        {
          id: "921858439641182219",
          allow: [
            Permissions.FLAGS.VIEW_CHANNEL,
            Permissions.FLAGS.MOVE_MEMBERS,
            Permissions.FLAGS.MUTE_MEMBERS,
          ],
        },

        {
          id: "922145394811625533",
          allow: [
            Permissions.FLAGS.VIEW_CHANNEL,
            Permissions.FLAGS.MOVE_MEMBERS,
            Permissions.FLAGS.MUTE_MEMBERS,
          ],
        },
      ];

      message.guild.channels
        .create(`●────│${name}│────●`, {
          type: "GUILD_CATEGORY",
          permissionOverwrites: permissions,
        })
        .then((category) => {
          message.guild.channels
            .create(`Family Chat`, {
              type: "GUILD_TEXT",
              parent: category.id,
              permissionOverwrites: [
                {
                  id: message.guild.roles.everyone,
                  deny: [Permissions.FLAGS.VIEW_CHANNEL],
                },
                {
                  id: "921858429071528006",
                  deny: [Permissions.FLAGS.VIEW_CHANNEL],
                },
                {
                  id: "921858441327300688",
                  deny: [Permissions.FLAGS.VIEW_CHANNEL],
                },
                {
                  id: "921858618259832962",
                  deny: [Permissions.FLAGS.VIEW_CHANNEL],
                },
                {
                  id: "921858628879786014",
                  deny: [Permissions.FLAGS.VIEW_CHANNEL],
                },
                {
                  id: "922104326896381992",
                  deny: [Permissions.FLAGS.VIEW_CHANNEL],
                },

                {
                  id: "921858423195308113",
                  allow: [
                    Permissions.FLAGS.MANAGE_CHANNELS,
                    Permissions.FLAGS.MANAGE_MESSAGES,
                  ],
                },

                {
                  id: "921858432057880647",
                  allow: [
                    Permissions.FLAGS.VIEW_CHANNEL,
                    Permissions.FLAGS.MANAGE_CHANNELS,
                    Permissions.FLAGS.MUTE_MEMBERS,
                    Permissions.FLAGS.MOVE_MEMBERS,
                    Permissions.FLAGS.CONNECT,
                  ],
                },

                {
                  id: "921858433949528064",
                  allow: [
                    Permissions.FLAGS.VIEW_CHANNEL,
                    Permissions.FLAGS.MANAGE_CHANNELS,
                    Permissions.FLAGS.MUTE_MEMBERS,
                    Permissions.FLAGS.MOVE_MEMBERS,
                  ],
                },

                {
                  id: "923340846823268433",
                  allow: [
                    Permissions.FLAGS.VIEW_CHANNEL,
                    Permissions.FLAGS.MOVE_MEMBERS,
                    Permissions.FLAGS.MUTE_MEMBERS,
                  ],
                },

                {
                  id: "921858439641182219",
                  allow: [
                    Permissions.FLAGS.VIEW_CHANNEL,
                    Permissions.FLAGS.MOVE_MEMBERS,
                    Permissions.FLAGS.MUTE_MEMBERS,
                  ],
                },

                {
                  id: "922145394811625533",
                  allow: [
                    Permissions.FLAGS.VIEW_CHANNEL,
                    Permissions.FLAGS.MOVE_MEMBERS,
                    Permissions.FLAGS.MUTE_MEMBERS,
                  ],
                },
              ],
            })
            .then((c) => (familyChat = c.id));

          message.guild.channels.create(`Music Chat`, {
            type: "GUILD_TEXT",
            parent: category.id,
            permissionOverwrites: [
              {
                id: message.guild.roles.everyone,
                deny: [Permissions.FLAGS.VIEW_CHANNEL],
              },
              {
                id: "921858429071528006",
                deny: [Permissions.FLAGS.VIEW_CHANNEL],
              },
              {
                id: "921858441327300688",
                deny: [Permissions.FLAGS.VIEW_CHANNEL],
              },
              {
                id: "921858618259832962",
                deny: [Permissions.FLAGS.VIEW_CHANNEL],
              },
              {
                id: "921858628879786014",
                deny: [Permissions.FLAGS.VIEW_CHANNEL],
              },
              {
                id: "922104326896381992",
                deny: [Permissions.FLAGS.VIEW_CHANNEL],
              },

              {
                id: "921858423195308113",
                allow: [
                  Permissions.FLAGS.MANAGE_CHANNELS,
                  Permissions.FLAGS.MANAGE_MESSAGES,
                ],
              },

              {
                id: "921858432057880647",
                allow: [
                  Permissions.FLAGS.VIEW_CHANNEL,
                  Permissions.FLAGS.MANAGE_CHANNELS,
                  Permissions.FLAGS.MUTE_MEMBERS,
                  Permissions.FLAGS.MOVE_MEMBERS,
                  Permissions.FLAGS.CONNECT,
                ],
              },

              {
                id: "921858433949528064",
                allow: [
                  Permissions.FLAGS.VIEW_CHANNEL,
                  Permissions.FLAGS.MANAGE_CHANNELS,
                  Permissions.FLAGS.MUTE_MEMBERS,
                  Permissions.FLAGS.MOVE_MEMBERS,
                ],
              },

              {
                id: "923340846823268433",
                allow: [
                  Permissions.FLAGS.VIEW_CHANNEL,
                  Permissions.FLAGS.MOVE_MEMBERS,
                  Permissions.FLAGS.MUTE_MEMBERS,
                ],
              },

              {
                id: "921858439641182219",
                allow: [
                  Permissions.FLAGS.VIEW_CHANNEL,
                  Permissions.FLAGS.MOVE_MEMBERS,
                  Permissions.FLAGS.MUTE_MEMBERS,
                ],
              },

              {
                id: "922145394811625533",
                allow: [
                  Permissions.FLAGS.VIEW_CHANNEL,
                  Permissions.FLAGS.MOVE_MEMBERS,
                  Permissions.FLAGS.MUTE_MEMBERS,
                ],
              },
            ],
          });

          message.guild.channels.create(`Public Voice`, {
            type: "GUILD_VOICE",
            parent: category.id,
            permissionOverwrites: [
              {
                id: "921858429071528006",
                deny: [Permissions.FLAGS.VIEW_CHANNEL],
              },
              {
                id: "921858441327300688",
                deny: [Permissions.FLAGS.VIEW_CHANNEL],
              },
              {
                id: "921858618259832962",
                deny: [Permissions.FLAGS.VIEW_CHANNEL],
              },
              {
                id: "921858628879786014",
                deny: [Permissions.FLAGS.VIEW_CHANNEL],
              },
              {
                id: "922104326896381992",
                deny: [Permissions.FLAGS.VIEW_CHANNEL],
              },

              {
                id: "921858423195308113",
                allow: [
                  Permissions.FLAGS.MANAGE_CHANNELS,
                  Permissions.FLAGS.MANAGE_MESSAGES,
                ],
              },

              {
                id: "921858432057880647",
                allow: [
                  Permissions.FLAGS.VIEW_CHANNEL,
                  Permissions.FLAGS.MANAGE_CHANNELS,
                  Permissions.FLAGS.MUTE_MEMBERS,
                  Permissions.FLAGS.MOVE_MEMBERS,
                  Permissions.FLAGS.CONNECT,
                ],
              },

              {
                id: "921858433949528064",
                allow: [
                  Permissions.FLAGS.VIEW_CHANNEL,
                  Permissions.FLAGS.MANAGE_CHANNELS,
                  Permissions.FLAGS.MUTE_MEMBERS,
                  Permissions.FLAGS.MOVE_MEMBERS,
                ],
              },

              {
                id: "923340846823268433",
                allow: [
                  Permissions.FLAGS.VIEW_CHANNEL,
                  Permissions.FLAGS.MOVE_MEMBERS,
                  Permissions.FLAGS.MUTE_MEMBERS,
                ],
              },

              {
                id: "921858439641182219",
                allow: [
                  Permissions.FLAGS.VIEW_CHANNEL,
                  Permissions.FLAGS.MOVE_MEMBERS,
                  Permissions.FLAGS.MUTE_MEMBERS,
                ],
              },

              {
                id: "922145394811625533",
                allow: [
                  Permissions.FLAGS.VIEW_CHANNEL,
                  Permissions.FLAGS.MOVE_MEMBERS,
                  Permissions.FLAGS.MUTE_MEMBERS,
                ],
              },
            ],
          });

          message.guild.channels.create(`Family`, {
            type: "GUILD_VOICE",
            parent: category.id,
            permissionOverwrites: [
              {
                id: message.guild.roles.everyone,
                deny: [Permissions.FLAGS.VIEW_CHANNEL],
              },
              {
                id: "921858429071528006",
                deny: [Permissions.FLAGS.VIEW_CHANNEL],
              },
              {
                id: "921858441327300688",
                deny: [Permissions.FLAGS.VIEW_CHANNEL],
              },
              {
                id: "921858618259832962",
                deny: [Permissions.FLAGS.VIEW_CHANNEL],
              },
              {
                id: "921858628879786014",
                deny: [Permissions.FLAGS.VIEW_CHANNEL],
              },
              {
                id: "922104326896381992",
                deny: [Permissions.FLAGS.VIEW_CHANNEL],
              },

              {
                id: "921858423195308113",
                allow: [
                  Permissions.FLAGS.MANAGE_CHANNELS,
                  Permissions.FLAGS.MANAGE_MESSAGES,
                ],
              },

              {
                id: "921858432057880647",
                allow: [
                  Permissions.FLAGS.VIEW_CHANNEL,
                  Permissions.FLAGS.MANAGE_CHANNELS,
                  Permissions.FLAGS.MUTE_MEMBERS,
                  Permissions.FLAGS.MOVE_MEMBERS,
                  Permissions.FLAGS.CONNECT,
                ],
              },

              {
                id: "921858433949528064",
                allow: [
                  Permissions.FLAGS.VIEW_CHANNEL,
                  Permissions.FLAGS.MANAGE_CHANNELS,
                  Permissions.FLAGS.MUTE_MEMBERS,
                  Permissions.FLAGS.MOVE_MEMBERS,
                ],
              },

              {
                id: "923340846823268433",
                allow: [
                  Permissions.FLAGS.VIEW_CHANNEL,
                  Permissions.FLAGS.MOVE_MEMBERS,
                  Permissions.FLAGS.MUTE_MEMBERS,
                ],
              },

              {
                id: "921858439641182219",
                allow: [
                  Permissions.FLAGS.VIEW_CHANNEL,
                  Permissions.FLAGS.MOVE_MEMBERS,
                  Permissions.FLAGS.MUTE_MEMBERS,
                ],
              },

              {
                id: "922145394811625533",
                allow: [
                  Permissions.FLAGS.VIEW_CHANNEL,
                  Permissions.FLAGS.MOVE_MEMBERS,
                  Permissions.FLAGS.MUTE_MEMBERS,
                ],
              },
            ],
          });

          message.guild.channels
            .create(`Private`, {
              type: "GUILD_VOICE",
              parent: category.id,
              permissionOverwrites: [
                {
                  id: message.guild.roles.everyone,
                  deny: [Permissions.FLAGS.VIEW_CHANNEL],
                },
                {
                  id: "921858429071528006",
                  deny: [Permissions.FLAGS.VIEW_CHANNEL],
                },
                {
                  id: "921858441327300688",
                  deny: [Permissions.FLAGS.VIEW_CHANNEL],
                },
                {
                  id: "921858618259832962",
                  deny: [Permissions.FLAGS.VIEW_CHANNEL],
                },
                {
                  id: "921858628879786014",
                  deny: [Permissions.FLAGS.VIEW_CHANNEL],
                },
                {
                  id: "922104326896381992",
                  deny: [Permissions.FLAGS.VIEW_CHANNEL],
                },

                {
                  id: "921858423195308113",
                  allow: [
                    Permissions.FLAGS.MANAGE_CHANNELS,
                    Permissions.FLAGS.MANAGE_MESSAGES,
                  ],
                },

                {
                  id: "921858432057880647",
                  allow: [
                    Permissions.FLAGS.VIEW_CHANNEL,
                    Permissions.FLAGS.MANAGE_CHANNELS,
                    Permissions.FLAGS.MUTE_MEMBERS,
                    Permissions.FLAGS.MOVE_MEMBERS,
                    Permissions.FLAGS.CONNECT,
                  ],
                },

                {
                  id: "921858433949528064",
                  allow: [
                    Permissions.FLAGS.VIEW_CHANNEL,
                    Permissions.FLAGS.MANAGE_CHANNELS,
                    Permissions.FLAGS.MUTE_MEMBERS,
                    Permissions.FLAGS.MOVE_MEMBERS,
                  ],
                },

                {
                  id: "923340846823268433",
                  allow: [
                    Permissions.FLAGS.VIEW_CHANNEL,
                    Permissions.FLAGS.MOVE_MEMBERS,
                    Permissions.FLAGS.MUTE_MEMBERS,
                  ],
                },

                {
                  id: "921858439641182219",
                  allow: [
                    Permissions.FLAGS.VIEW_CHANNEL,
                    Permissions.FLAGS.MOVE_MEMBERS,
                    Permissions.FLAGS.MUTE_MEMBERS,
                  ],
                },

                {
                  id: "922145394811625533",
                  allow: [
                    Permissions.FLAGS.VIEW_CHANNEL,
                    Permissions.FLAGS.MOVE_MEMBERS,
                    Permissions.FLAGS.MUTE_MEMBERS,
                  ],
                },
              ],
            })
            .then(() => {
              msg.edit(
                `>>> Bax **${name}** ba movafaghiat sakhte shod. <#${familyChat}>`
              );
            });
        });
    });
  },
};
