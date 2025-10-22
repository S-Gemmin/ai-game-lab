#### AI Game Projects

A minimalist collection of classic games powered by simple AI logic, all playable in the browser. Each game is self-contained and designed to be fast, intuitive, and fun.

###### Games Included

| Game     | Description                    |
|----------|--------------------------------|
| Checkers | Basic checkers with AI moves   |
| RPS      | Rock Paper Scissors simulator  |
| Stones   | Nim-style stone game           |
| Wordle   | Word guessing game             |

###### Project Structure

```
ai-game-projects/
├── index.html
├── styles.html
├── documentation.pdf
├── README.md
├── assets/
│   └── global.css
│   └── icon.png
├── games/
│   ├── checkers/
│   │   ├── checkers.html
│   │   ├── checkers.js
│   │   └── checkers.css
│   ├── rps/
│   │   ├── rps.html
│   │   ├── rps.js
│   │   └── rps.css
│   ├── stones/
│   │   ├── stones.html
│   │   ├── main.js
│   │   └── styles.css
│   └── wordle/
│       ├── wordle.html
│       ├── wordle.js
│       └── wordle.css
```

###### Valid Words for Wordle

``` 
const WORDS = [
    'about', 'above', 'abuse', 'actor', 'acute', 'admit', 'adopt', 'adult', 'after', 'again',
    'agent', 'agree', 'ahead', 'alarm', 'album', 'alert', 'alien', 'align', 'alike', 'alive',
    'allow', 'alone', 'along', 'alter', 'among', 'anger', 'angle', 'angry', 'apart', 'apple',
    'apply', 'arena', 'argue', 'arise', 'array', 'arrow', 'aside', 'ask', 'asset', 'atlas',
    'avoid', 'awake', 'award', 'aware', 'badly', 'baker', 'bases', 'basic', 'batch', 'beach',
    'began', 'begin', 'being', 'below', 'bench', 'billy', 'birth', 'black', 'blame', 'blank',
    'blast', 'blind', 'block', 'blood', 'bloom', 'blown', 'blues', 'blunt', 'blush', 'board',
    'boast', 'bobby', 'boost', 'booth', 'bound', 'brain', 'brake', 'brand', 'brass', 'brave',
    'bread', 'break', 'breed', 'brief', 'bring', 'broad', 'broke', 'brown', 'brush', 'build',
    'built', 'bunch', 'burke', 'burst', 'buyer', 'cable', 'calif', 'carry', 'catch', 'cause',
    'chain', 'chair', 'chaos', 'charm', 'chart', 'chase', 'cheap', 'check', 'chest', 'chief',
    'child', 'china', 'chose', 'civil', 'claim', 'class', 'clean', 'clear', 'click', 'climb',
    'clock', 'close', 'cloud', 'coach', 'coast', 'could', 'count', 'court', 'cover', 'craft',
    'crash', 'crazy', 'cream', 'crime', 'cross', 'crowd', 'crown', 'crude', 'curve', 'cycle',
    'daily', 'dairy', 'dance', 'dated', 'dealt', 'death', 'debut', 'delay', 'depth', 'doing',
    'doubt', 'dozen', 'draft', 'drama', 'drank', 'drawn', 'dream', 'dress', 'drill', 'drink',
    'drive', 'drove', 'dying', 'eager', 'early', 'earth', 'eight', 'elite', 'empty', 'enemy',
    'enjoy', 'enter', 'entry', 'equal', 'error', 'event', 'every', 'exact', 'exist', 'extra',
    'faith', 'false', 'fault', 'fiber', 'field', 'fifth', 'fifty', 'fight', 'final', 'first',
    'fixed', 'flash', 'fleet', 'floor', 'fluid', 'focus', 'force', 'forth', 'forty', 'forum',
    'found', 'frame', 'frank', 'fraud', 'fresh', 'front', 'fruit', 'fully', 'funny', 'giant',
    'given', 'glass', 'globe', 'going', 'grace', 'grade', 'grand', 'grant', 'grass', 'grave',
    'great', 'green', 'gross', 'group', 'grown', 'guard', 'guess', 'guest', 'guide', 'happy',
    'harry', 'heart', 'heavy', 'henry', 'horse', 'hotel', 'house', 'human', 'ideal', 'image',
    'index', 'inner', 'input', 'issue', 'japan', 'jimmy', 'joint', 'jones', 'judge', 'known',
    'label', 'large', 'laser', 'later', 'laugh', 'layer', 'learn', 'lease', 'least', 'leave',
    'legal', 'level', 'lewis', 'light', 'limit', 'links', 'lives', 'local', 'loose', 'lower',
    'lucky', 'lunch', 'lying', 'magic', 'major', 'maker', 'march', 'maria', 'match', 'maybe',
    'mayor', 'meant', 'media', 'metal', 'might', 'minor', 'minus', 'mixed', 'model', 'money',
    'month', 'moral', 'motor', 'mount', 'mouse', 'mouth', 'moved', 'movie', 'music', 'needs',
    'never', 'newly', 'night', 'noise', 'north', 'noted', 'novel', 'nurse', 'occur', 'ocean',
    'offer', 'often', 'order', 'other', 'ought', 'outer', 'owned', 'owner', 'paint', 'panel',
    'paper', 'party', 'peace', 'peter', 'phase', 'phone', 'photo', 'piano', 'piece', 'pilot',
    'pitch', 'place', 'plain', 'plane', 'plant', 'plate', 'point', 'pound', 'power', 'press',
    'price', 'pride', 'prime', 'print', 'prior', 'prize', 'proof', 'proud', 'prove', 'queen',
    'quick', 'quiet', 'quite', 'radio', 'raise', 'range', 'rapid', 'ratio', 'reach', 'ready',
    'realm', 'rebel', 'refer', 'relax', 'repay', 'reply', 'right', 'rigid', 'rival', 'river',
    'robin', 'roger', 'roman', 'rough', 'round', 'route', 'royal', 'rural', 'scale', 'scene',
    'scope', 'score', 'sense', 'serve', 'seven', 'shall', 'shape', 'share', 'sharp', 'sheet',
    'shelf', 'shell', 'shift', 'shine', 'shirt', 'shock', 'shoot', 'short', 'shown', 'sided',
    'sight', 'silly', 'since', 'sixth', 'sixty', 'sized', 'skill', 'sleep', 'slide', 'small',
    'smart', 'smile', 'smith', 'smoke', 'solid', 'solve', 'sorry', 'sound', 'south', 'space',
    'spare', 'speak', 'speed', 'spend', 'spent', 'split', 'spoke', 'sport', 'staff', 'stage',
    'stake', 'stand', 'start', 'state', 'steam', 'steel', 'steep', 'steer', 'stern', 'stick',
    'still', 'stock', 'stone', 'stood', 'store', 'storm', 'story', 'strip', 'stuck', 'study',
    'stuff', 'style', 'sugar', 'suite', 'super', 'sweet', 'swept', 'swing', 'sworn', 'table',
    'taken', 'taste', 'taxes', 'teach', 'tends', 'terry', 'texas', 'thank', 'theft', 'their',
    'theme', 'there', 'these', 'thick', 'thing', 'think', 'third', 'those', 'three', 'threw',
    'throw', 'thumb', 'tight', 'timed', 'tired', 'title', 'today', 'topic', 'total', 'touch',
    'tough', 'tower', 'track', 'trade', 'train', 'treat', 'trend', 'trial', 'tribe', 'trick',
    'tried', 'tries', 'truck', 'truly', 'trunk', 'trust', 'truth', 'twice', 'uncle', 'under',
    'undue', 'union', 'unity', 'until', 'upper', 'upset', 'urban', 'usage', 'usual', 'valid',
    'value', 'video', 'virus', 'visit', 'vital', 'vocal', 'voice', 'waste', 'watch', 'water',
    'wheel', 'where', 'which', 'while', 'white', 'whole', 'whose', 'woman', 'women', 'world',
    'worry', 'worse', 'worst', 'worth', 'would', 'write', 'wrong', 'wrote', 'yield', 'young',
    'youth'
];
```

###### License

MIT — feel free to use, modify, and share.
