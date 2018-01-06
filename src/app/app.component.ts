import { Component } from '@angular/core';
import * as spells from '../assets/data/spells.json';
import * as effects from '../assets/data/effectsv2.json';
import * as monsters from '../assets/data/monsters.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public wandEffect = {
    type : '',
    name : '',
    target : ''
  };
  private  selectedSpell ={};

  spellSelector = [];
  targetSelector = [
    'Self',
    'Intended Target'
  ];
  private customSummons = [
    'King Gizzard and his Lizard Wizard',
    'Oliver Surprise'
  ]

  constructor() {
    this.pullNames();
  }

  pullNames(){
    for(let spell in spells){
      this.spellSelector.push(spell);
    }
  }

  generateWandEffect(){
    this.selectedSpell = {};
    this.wandEffect = {
      type : '',
      name : '',
      target : ''
    };
    const type = this.getType();
    console.log(type);
    if(type === 'Cast') {
      this.getRandomSpell();
    } else if (type == 'Effect') {
      this.getRandomEffect();
    } else {
      this.getRandomSummon(Math.random() * (100 - 0) + 0);
    }
  }

  getType(){
    const diceRoll = Math.random() * (100 - 0) + 0;
    if (diceRoll <= 35){
      return 'Effect';
    } else if (diceRoll <=70) {
      return 'Cast';
    } else {
      return 'Summon';
    }
  }

  getRandomSpell(){
    let target = this.getRandomValue(this.targetSelector);
    const spellName = this.getRandomValue(this.spellSelector);
    if(spells[spellName].range.toLowerCase().includes('self')){
      target = spells[spellName].range
    }
    console.log(spellName)
    console.log(target)
    this.wandEffect = {
      type : 'Cast',
      name : spellName,
      target : target
    }
    this.selectedSpell = spells[spellName];
  }

  getRandomEffect(){
    const effectName = this.getRandomValue(effects);
    this.wandEffect = {
      type : 'Effect',
      name : effectName,
      target : ''
    };
  }

  getRandomSummon(chance){
    let summonArray;
    if (chance < 90) {
      summonArray = monsters;
    } else {
      summonArray = this.customSummons;
    }
    const summon = this.getRandomValue(summonArray);
    const summonTime = Math.round(Math.random() * (4 - 1) + 1) + ' round(s)';
    this.wandEffect = {
      type : 'Summon',
      name : summon,
      target : summonTime
    }
  }

  getRandomValue(array){
    return array[Math.floor(Math.random()*array.length)];
  }

}
