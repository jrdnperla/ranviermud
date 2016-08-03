'use strict';

const Broadcast = require('../../src/broadcast').Broadcast;
const Random    = require('../../src/random').Random;
const util = require('util');

exports.listeners = {

  playerEnter: l10n => {
    return (room, rooms, player, players, npc) => {
      const rand = Random.inRange(1, 5);
      if (rand === 3) {
        const msg = '<bold>The roach waggles its antennae.</bold>';
        const toRoom = Broadcast.toRoom(room, this, player, players);
        toRoom({
          secondPartyMessage: msg,
          thirdPartyMessage: msg
        });

      }
    }
  },

  playerDropItem: l10n => {
    return (room, player, players, item) => {
      const rand = Random.inRange(1, 5);
      if (rand === 3) {
        const itemDesc = item.getShortDesc();
        const msg = '<bold>The roach scurries over to the ' + itemDesc +'</bold>';
        const toRoom = Broadcast.toRoom(room, this, player, players);
        toRoom({
          secondPartyMessage: msg,
          thirdPartyMessage: msg
        });
      }
    }
  },

  hit: function(l10n) {
    return function(room, player, players, hitLocation, damage) {
      const toRoom = Broadcast.toRoom(room, this, player, players);

      const secondPartyMessages = [
        'The roach\'s pincers nip your ' + hitLocation + '.',
        'The roach bites your ' + hitLocation + ', drawing a pinprick of blood.',
      ];
      const thirdPartyMessages = [
        'The roach\'s pincers nip ' + player.combat.getDesc() + '\'s ' + hitLocation + '.',
        'The roach bites ' + player.combat.getDesc() + ' in the ' + hitLocation + ' and a tiny pinprick of blood wells forth.',
      ];
      Broadcast.consistentMessage(toRoom, { secondPartyMessage, thirdPartyMessage });
    }

  },

  damaged: function(l10n) {
    return function(room, player, players, hitLocation, damage) {
      const toRoom = Broadcast.toRoom(room, this, player, players);

      const secondPartyMessages = [
        'The roach chitters as its antennae are bent at an odd angle.',
        'The roach\'s chitin splinters and cracks around its ' + hitLocation + '.',
        'The roach hisses as ichor oozes from its wounds.'
      ];
      const thirdPartyMessages = [
        'The roach chitters in pain as its ' + hitLocation + ' shatters.',
        'Hissing furiously, the roach rears its pincer-covered maw.',
        'Ichor oozes from the injured roach.'
      ];
      
      Broadcast.consistentMessage(toRoom, { secondPartyMessage, thirdPartyMessage });
    }
  },

};
