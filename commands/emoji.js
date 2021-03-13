const argParser = require("../functions/parseArgs");
const reqImage = require("../functions/requestImage");

module.exports.label = "emoji";

module.exports.generator = function (msg, argsv) {
	const args = argParser(argsv);
	const channel = msg.channel;
	const guild = channel.guild;
	const icons = [];

	if (args.args[0] == null) {
		icons.push({
			url: msg.author.staticAvatarURL,
			name: args.parameters.name || msg.author.id
		});
	} else if (args.args[0] == "mention" || args.args[0] == "m") {
		if(msg.mentions[0] != null) {
			icons.push({
				url: msg.mentions[0].staticAvatarURL,
				name: args.parameters.name || msg.mentions[0].id
			});
		} else {
			msg.channel.createMessage("メンションがないよ:pleading_face:");
		}
	}

	for (const icon of icons) {
		try {
			reqImage(icon.url).then(result => {
				guild.createEmoji({
					name: icon.name,
					image: result
				}).then(emoji => {
					msg.channel.createMessage(`出来上がりました！<:${emoji.name}:${emoji.id}>`);
				}).catch(err => {
					msg.channel.createMessage(err);
				});
			});
		} catch(error) {
			msg.channel.createMessage(error);
		}
	}
};

module.exports.options = {
	guildOnly: true,
	requirements: {
		custom: function ({member}) {
			if (member.$roles.some(role => (role.name.toLowerCase() == "useicontoemoji")) || member.permission.has("manageEmojis")) {
				return true;
			} else {
				msg.channel.createMessage("権限が不足しています。useIconToEmojiの名前の権限を持っているか、emoji管理権限が必要です");
				return false;
			}
		}
	}
}