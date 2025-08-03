module.exports = {
  name: "menu",
  description: "Afficher la liste des commandes disponibles",
  async execute(message, args) {
    const menuText = `
Liste des commandes:
- .kickall : Expulse tous les membres (admin seulement)
- .ban : Bannir un utilisateur
- .welcome : Active/Désactive le message de bienvenue
- .demote : Rétrograder un membre
- .promote : Promouvoir un membre
- .menu : Affiche ce menu
    `;
    await message.reply(menuText);
  }
};
