function ClozeCard(text, cloze) {

    if (!text.includes(cloze)) {
		console.log('ERROR: ' + cloze + ' does not appear in the full text answer.');
		return;
	}

    this.partial = text.split(cloze).join(". . .");
    this.cloze = cloze;
    this.fullText = text;

    
}

module.exports = ClozeCard;