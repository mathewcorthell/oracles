import { useState } from 'react'
import './App.css'

// Paired tables (use table 1 + table 2)
import actions1 from '../terms/actions_1.json'
import actions2 from '../terms/actions_2.json'
import descriptor1 from '../terms/descriptor_1.json'
import descriptor2 from '../terms/descriptor_2.json'

// Single tables (pick twice from same table)
import adventureTone from '../terms/adventure_tone.json'
import alienSpeciesDescriptors from '../terms/alien_species_descriptors.json'
import animalActions from '../terms/animal_actions.json'
import armyDescriptors from '../terms/army_descriptors.json'
import cavernDescriptors from '../terms/cavern_descriptors.json'
import characters from '../terms/characters.json'
import characterActionsCombat from '../terms/character_actions_combat.json'
import characterActionsGeneral from '../terms/character_actions_general.json'
import characterAppearance from '../terms/character_appearance.json'
import characterBackground from '../terms/character_background.json'
import characterConversations from '../terms/character_conversations.json'
import characterDescriptors from '../terms/character_descriptors.json'
import characterIdentity from '../terms/character_identity.json'
import characterMotivations from '../terms/character_motivations.json'
import characterPersonality from '../terms/character_personality.json'
import characterSkills from '../terms/character_skills.json'
import characterTraitsFlaws from '../terms/character_traits_flaws.json'
import cityDescriptors from '../terms/city_descriptors.json'
import civilizationDescriptors from '../terms/civilization_descriptors.json'
import creatureAbilities from '../terms/creature_abilities.json'
import creatureDescriptors from '../terms/creature_descriptors.json'
import crypticMessage from '../terms/cryptic_message.json'
import curses from '../terms/curses.json'
import domicileDescriptors from '../terms/domicile_descriptors.json'
import dungeonDescriptors from '../terms/dungeon_descriptors.json'
import dungeonTraps from '../terms/dungeon_traps.json'
import forestDescriptors from '../terms/forest_descriptors.json'
import gods from '../terms/gods.json'
import legends from '../terms/legends.json'
import locations from '../terms/locations.json'
import magicItemDescriptors from '../terms/magic_item_descriptors.json'
import mutationDescriptors from '../terms/mutation_descriptors.json'
import names from '../terms/names.json'
import nobleHouse from '../terms/noble_house.json'
import objects from '../terms/objects.json'
import plotTwists from '../terms/plot_twists.json'
import powers from '../terms/powers.json'
import scavengingResults from '../terms/scavenging_results.json'
import smells from '../terms/smells.json'
import sounds from '../terms/sounds.json'
import spellEffects from '../terms/spell_effects.json'
import starshipDescriptors from '../terms/starship_descriptors.json'
import terrainDescriptors from '../terms/terrain_descriptors.json'
import undeadDescriptors from '../terms/undead_descriptors.json'
import visionsDreams from '../terms/visions_dreams.json'

type OracleEntry = {
  type: 'paired'
  table1: string[]
  table2: string[]
} | {
  type: 'single'
  table: string[]
}

const oracles: Record<string, OracleEntry> = {
  'Actions': { type: 'paired', table1: actions1.terms, table2: actions2.terms },
  'Descriptor': { type: 'paired', table1: descriptor1.terms, table2: descriptor2.terms },
  'Adventure Tone': { type: 'single', table: adventureTone.terms },
  'Alien Species Descriptors': { type: 'single', table: alienSpeciesDescriptors.terms },
  'Animal Actions': { type: 'single', table: animalActions.terms },
  'Army Descriptors': { type: 'single', table: armyDescriptors.terms },
  'Cavern Descriptors': { type: 'single', table: cavernDescriptors.terms },
  'Characters': { type: 'single', table: characters.terms },
  'Character Actions (Combat)': { type: 'single', table: characterActionsCombat.terms },
  'Character Actions (General)': { type: 'single', table: characterActionsGeneral.terms },
  'Character Appearance': { type: 'single', table: characterAppearance.terms },
  'Character Background': { type: 'single', table: characterBackground.terms },
  'Character Conversations': { type: 'single', table: characterConversations.terms },
  'Character Descriptors': { type: 'single', table: characterDescriptors.terms },
  'Character Identity': { type: 'single', table: characterIdentity.terms },
  'Character Motivations': { type: 'single', table: characterMotivations.terms },
  'Character Personality': { type: 'single', table: characterPersonality.terms },
  'Character Skills': { type: 'single', table: characterSkills.terms },
  'Character Traits & Flaws': { type: 'single', table: characterTraitsFlaws.terms },
  'City Descriptors': { type: 'single', table: cityDescriptors.terms },
  'Civilization Descriptors': { type: 'single', table: civilizationDescriptors.terms },
  'Creature Abilities': { type: 'single', table: creatureAbilities.terms },
  'Creature Descriptors': { type: 'single', table: creatureDescriptors.terms },
  'Cryptic Message': { type: 'single', table: crypticMessage.terms },
  'Curses': { type: 'single', table: curses.terms },
  'Domicile Descriptors': { type: 'single', table: domicileDescriptors.terms },
  'Dungeon Descriptors': { type: 'single', table: dungeonDescriptors.terms },
  'Dungeon Traps': { type: 'single', table: dungeonTraps.terms },
  'Forest Descriptors': { type: 'single', table: forestDescriptors.terms },
  'Gods': { type: 'single', table: gods.terms },
  'Legends': { type: 'single', table: legends.terms },
  'Locations': { type: 'single', table: locations.terms },
  'Magic Item Descriptors': { type: 'single', table: magicItemDescriptors.terms },
  'Mutation Descriptors': { type: 'single', table: mutationDescriptors.terms },
  'Names': { type: 'single', table: names.terms },
  'Noble House': { type: 'single', table: nobleHouse.terms },
  'Objects': { type: 'single', table: objects.terms },
  'Plot Twists': { type: 'single', table: plotTwists.terms },
  'Powers': { type: 'single', table: powers.terms },
  'Scavenging Results': { type: 'single', table: scavengingResults.terms },
  'Smells': { type: 'single', table: smells.terms },
  'Sounds': { type: 'single', table: sounds.terms },
  'Spell Effects': { type: 'single', table: spellEffects.terms },
  'Starship Descriptors': { type: 'single', table: starshipDescriptors.terms },
  'Terrain Descriptors': { type: 'single', table: terrainDescriptors.terms },
  'Undead Descriptors': { type: 'single', table: undeadDescriptors.terms },
  'Visions & Dreams': { type: 'single', table: visionsDreams.terms },
}

type OracleName = keyof typeof oracles

function App() {
  const [selectedOracle, setSelectedOracle] = useState<OracleName>('Actions')
  const [results, setResults] = useState<{ left: string; right: string }[]>([])

  const generatePairs = (count: number) => {
    const oracle = oracles[selectedOracle]
    const pairs = []

    for (let i = 0; i < count; i++) {
      let left: string
      let right: string

      if (oracle.type === 'paired') {
        left = oracle.table1[Math.floor(Math.random() * oracle.table1.length)]
        right = oracle.table2[Math.floor(Math.random() * oracle.table2.length)]
      } else {
        left = oracle.table[Math.floor(Math.random() * oracle.table.length)]
        right = oracle.table[Math.floor(Math.random() * oracle.table.length)]
      }

      pairs.push({ left, right })
    }

    setResults(pairs)
  }

  return (
    <div className="app">
      <h1>Oracles</h1>
      <div className="controls">
        <select
          value={selectedOracle}
          onChange={(e) => setSelectedOracle(e.target.value as OracleName)}
        >
          {Object.keys(oracles).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="buttons">
        <button onClick={() => generatePairs(1)}>Generate 1</button>
        <button onClick={() => generatePairs(10)}>Generate 10</button>
        <button onClick={() => generatePairs(20)}>Generate 20</button>
      </div>
      {results.length > 0 && (
        <div className="results">
          {results.map((result, index) => (
            <div key={index} className="result">
              {result.left} {result.right}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
