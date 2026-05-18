const TRANSLATIONS = {
  en: {
    'intro.eyebrow': 'Six-Axis Political Compass',
    'intro.title': 'Where do you sit<br>on the six axes?',
    'intro.body': 'The standard left–right spectrum collapses six distinct political dimensions into one. This tool maps your position across all of them: cultural, economic, military, sovereignty, governance, and class.',
    'intro.meta': '24 statements · approximately 5 minutes',
    'intro.begin': 'Begin',
    'intro.disclaimer': 'Your answers are not stored or transmitted anywhere.',
    'intro.uploadLabel': 'Upload saved map (JSON / XML)',

    'quiz.axisTag': '{axis} axis',
    'quiz.back': '← Back',

    'response.stronglyAgree': 'Strongly agree',
    'response.agree': 'Agree',
    'response.neutral': 'Neither agree nor disagree',
    'response.disagree': 'Disagree',
    'response.stronglyDisagree': 'Strongly disagree',

    'results.eyebrow': 'Your results',
    'results.title': 'Your six-axis profile',
    'results.compare': 'Compare:',
    'results.yourMap': 'Your map',
    'results.orientation': 'Orientation',
    'results.edgeUp': 'Edge up',
    'results.vertexUp': 'Vertex up',
    'results.download': 'Download',
    'results.imagePng': 'Image (PNG)',
    'results.dataJson': 'Data (JSON)',
    'results.dataXml': 'Data (XML)',
    'results.compareSaved': 'Compare a saved map',
    'results.uploadLabel': 'Upload JSON or XML',
    'results.clear': 'Clear',
    'results.uploadNote': 'Only files exported from this tool are supported. No data is transmitted anywhere.',
    'results.axisOrder': 'Axis order — drag to reposition',
    'results.footer': 'This framework is the analytical foundation of <em>The Common Enemy</em> — a podcast and academic project examining the structural causes of contemporary British political crisis. <a href="https://github.com/earlution/common-enemy" target="_blank" rel="noopener">Learn more</a>.',
    'results.retake': 'Retake',
    'results.you': 'You',
    'results.uploadedMap': 'Uploaded map',
    'results.emptyScores': 'Select a profile above to see scores.',
    'results.share': 'Share',
    'results.copyLink': 'Copy link',
    'results.addCustomActor': 'Add custom actor',
    'results.actorName': 'Name',
    'results.actorColor': 'Colour',
    'results.add': 'Add',

    'chart.ariaLabel': 'Six-axis radar chart showing your political profile',

    'error.upload': 'Could not read file. Make sure it is a valid .json or .xml exported from this tool.\n\n',

    'axis.Cultural': 'Cultural',
    'axis.Economic': 'Economic',
    'axis.Military': 'Military',
    'axis.Sovereignty': 'Sovereignty',
    'axis.Governance': 'Governance',
    'axis.Class': 'Class',

    'axis.Cultural.low': 'Cultural internationalism',
    'axis.Cultural.high': 'Cultural nationalism',
    'axis.Economic.low': 'Economic internationalism',
    'axis.Economic.high': 'Economic nationalism',
    'axis.Military.low': 'Non-interventionist',
    'axis.Military.high': 'Interventionist',
    'axis.Sovereignty.low': 'Supranational',
    'axis.Sovereignty.high': 'National sovereignty',
    'axis.Governance.low': 'Maximal autonomy / consent-based / democratic',
    'axis.Governance.high': 'Maximal hierarchy / authority / coercive',
    'axis.Class.low': 'Class harmony',
    'axis.Class.high': 'Class conflict',

    'actor.Conservative Party': 'Conservative Party',
    'actor.Labour Party': 'Labour Party',
    'actor.Reform UK': 'Reform UK',
    'actor.Liberal Democrats': 'Liberal Democrats',
    'actor.Green Party': 'Green Party',
    'actor.SNP': 'SNP',
    'actor.Plaid Cymru': 'Plaid Cymru',
    'actor.US Democrats': 'US Democrats',
    'actor.US Republicans': 'US Republicans',

    'actor.John Maynard Keynes': 'John Maynard Keynes',
    'actor.Milton Friedman': 'Milton Friedman',

    'actor.Clement Attlee': 'Clement Attlee',
    'actor.Winston Churchill': 'Winston Churchill',
    'actor.Adolf Hitler': 'Adolf Hitler',
    'actor.Franklin D. Roosevelt': 'Franklin D. Roosevelt',
    'actor.Benito Mussolini': 'Benito Mussolini',
    'actor.Joseph Stalin': 'Joseph Stalin',
    'actor.Adolf Hitler': 'Adolf Hitler',
    'actor.Franklin D. Roosevelt': 'Franklin D. Roosevelt',
    'actor.Benito Mussolini': 'Benito Mussolini',
    'actor.Joseph Stalin': 'Joseph Stalin',
    'actor.Attlee government 1945–51': 'Attlee government 1945–51',
    'actor.Thatcher government 1979–90': 'Thatcher government 1979–90',
    'actor.Bush/Blair Iraq position': 'Bush/Blair Iraq position',
    'actor.Stop the War Coalition': 'Stop the War Coalition',
    'actor.Enoch Powell 1968': 'Enoch Powell 1968',
    'actor.Federalist EU tradition': 'Federalist EU tradition',
    'actor.Anarcho-communism': 'Anarcho-communism',
    'actor.Leninism': 'Leninism',
    'actor.Fascism': 'Fascism',
    "actor.Orbán's Hungary": "Orbán's Hungary",

    'actor.Hard Brexit': 'Hard Brexit',
    'actor.Soft Brexit': 'Soft Brexit',
    "actor.People's Vote": "People's Vote",
    'actor.Brexit Intersection': 'Brexit Intersection',

    'actor.browseData': 'Browse data',
    'actor.close': 'Close',
    'actor.curator': 'Curator',
    'actor.version': 'Version',
    'actor.lastUpdated': 'Last updated',
    'actor.confidence.high': 'High confidence',
    'actor.confidence.medium': 'Medium confidence',
    'actor.confidence.low': 'Low confidence',
    'actor.rationale': 'Rationale',
    'actor.sources': 'Sources',
    'actor.noSources': 'No sources on record. Researchers are invited to submit citations via pull request.',
    'actor.source.type.manifesto': 'Manifesto',
    'actor.source.type.legislation': 'Legislation',
    'actor.source.type.vote': 'Parliamentary vote',
    'actor.source.type.policy': 'Policy',
    'actor.source.type.speech': 'Speech',
    'actor.source.type.academic': 'Academic',
    'actor.source.type.media': 'Media',
    'actor.source.relevantText': 'Relevant text',
    'actor.source.citation': 'Citation',

    'axis.position': 'position {n}',
    'config.language': 'Language',
    'config.theme': 'Theme',
    'results.dark': 'Dark',
    'results.light': 'Light',

    'results.invertPoles': 'Invert poles'
  }
};

let currentLang = 'en';

export function setLanguage(lang) {
  currentLang = lang;
}

export function getLanguage() {
  return currentLang;
}

export function t(key, vars = {}) {
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  let text = dict[key] || key;
  for (const [k, v] of Object.entries(vars)) {
    text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
  }
  return text;
}
