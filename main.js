module.exports.loop = function () {
  Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'creep_' + (Object.keys(Game.creeps).length + 1) );
     
  for (var name in Game.creeps) {
      var creep = Game.creeps[name];
      
      if (creep.transfer(creep.room.controller, RESOURCE_ENERGY) == OK) {continue;}
      
      if(creep.store.getFreeCapacity() > 0) {
        var sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(sources[0]);
        }
      }
      else if (creep.store.getFreeCapacity() == 0) {
        if( creep.transfer(creep.room.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
          creep.moveTo(creep.room.controller);
        }
        
      }
      else {
        if( creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
          creep.moveTo(Game.spawns['Spawn1']);
        }
      }
  }
  

  // Generate a pixel when CPU bucket is maxed out
  if (Game.cpu.generatePixel && Game.cpu.bucket >= 10000) {
    console.log('generating a pixel');
    Game.cpu.generatePixel();
  }
};
