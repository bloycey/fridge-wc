import JSConfetti from 'js-confetti'

export const fireShoppingListEmojis = itemText => {
	const jsConfetti = new JSConfetti()
	const removeCanvases = () => {
		const canvases = document.querySelectorAll("canvas")
		canvases.forEach(canvas => {
			canvas.remove()
		})
	}
	const getConfettiType = () => {
		if (itemText.toLowerCase().includes("apple")) {
			return ({ emojis: ["🍎"] })
		} else if (itemText.toLowerCase().includes("banana")) {
			return ({ emojis: ["🍌"] })
		} else if (itemText.toLowerCase().includes("orange")) {
			return ({ emojis: ["🍊"] })
		} else if (itemText.toLowerCase().includes("grapes")) {
			return ({ emojis: ["🍇"] })
		} else if (itemText.toLowerCase().includes("strawberry") || itemText.toLowerCase().includes("strawberries")) {
			return ({ emojis: ["🍓"] })
		} else if (itemText.toLowerCase().includes("watermelon")) {
			return ({ emojis: ["🍉"] })
		} else if (itemText.toLowerCase().includes("pear")) {
			return ({ emojis: ["🍐"] })
		} else if (itemText.toLowerCase().includes("peach")) {
			return ({ emojis: ["🍑"] })
		} else if (itemText.toLowerCase().includes("cherries")) {
			return ({ emojis: ["🍒"] })
		} else if (itemText.toLowerCase().includes("pineapple")) {
			return ({ emojis: ["🍍"] })
		} else if (itemText.toLowerCase().includes("mango")) {
			return ({ emojis: ["🥭"] })
		} else if (itemText.toLowerCase().includes("kiwi")) {
			return ({ emojis: ["🥝"] })
		} else if (itemText.toLowerCase().includes("tomato")) {
			return ({ emojis: ["🍅"] })
		} else if (itemText.toLowerCase().includes("eggplant")) {
			return ({ emojis: ["🍆"] })
		} else if (itemText.toLowerCase().includes("avocado")) {
			return ({ emojis: ["🥑"] })
		} else if (itemText.toLowerCase().includes("potato")) {
			return ({ emojis: ["🥔"] })
		} else if (itemText.toLowerCase().includes("carrot")) {
			return ({ emojis: ["🥕"] })
		} else if (itemText.toLowerCase().includes("corn")) {
			return ({ emojis: ["🌽"] })
		} else if (itemText.toLowerCase().includes("chilli")) {
			return ({ emojis: ["🌶"] })
		} else if (itemText.toLowerCase().includes("capsicum")) {
			return ({ emojis: ["🫑"] })
		} else if (itemText.toLowerCase().includes("mushroom")) {
			return ({ emojis: ["🍄"] })
		} else if (itemText.toLowerCase().includes("peanut")) {
			return ({ emojis: ["🥜"] })
		} else if (itemText.toLowerCase().includes("chestnut")) {
			return ({ emojis: ["🌰"] })
		} else if (itemText.toLowerCase().includes("bread")) {
			return ({ emojis: ["🍞"] })
		} else if (itemText.toLowerCase().includes("croissant")) {
			return ({ emojis: ["🥐"] })
		} else if (itemText.toLowerCase().includes("baguette")) {
			return ({ emojis: ["🥖"] })
		} else if (itemText.toLowerCase().includes("pretzel")) {
			return ({ emojis: ["🥨"] })
		} else if (itemText.toLowerCase().includes("cheese")) {
			return ({ emojis: ["🧀"] })
		} else if (itemText.toLowerCase().includes("egg")) {
			return ({ emojis: ["🥚"] })
		} else if (itemText.toLowerCase().includes("bacon")) {
			return ({ emojis: ["🥓"] })
		} else if (itemText.toLowerCase().includes("pancake")) {
			return ({ emojis: ["🥞"] })
		} else if (itemText.toLowerCase().includes("waffle")) {
			return ({ emojis: ["🧇"] })
		} else if (itemText.toLowerCase().includes("pizza")) {
			return ({ emojis: ["🍕"] })
		} else if (itemText.toLowerCase().includes("hamburger")) {
			return ({ emojis: ["🍔"] })
		} else if (itemText.toLowerCase().includes("fries")) {
			return ({ emojis: ["🍟"] })
		} else if (itemText.toLowerCase().includes("hotdog")) {
			return ({ emojis: ["🌭"] })
		} else if (itemText.toLowerCase().includes("taco")) {
			return ({ emojis: ["🌮"] })
		} else if (itemText.toLowerCase().includes("burrito")) {
			return ({ emojis: ["🌯"] })
		} else if (itemText.toLowerCase().includes("popcorn")) {
			return ({ emojis: ["🍿"] })
		} else if (itemText.toLowerCase().includes("donut")) {
			return ({ emojis: ["🍩"] })
		} else if (itemText.toLowerCase().includes("cookie")) {
			return ({ emojis: ["🍪"] })
		} else if (itemText.toLowerCase().includes("cake")) {
			return ({ emojis: ["🍰"] })
		} else if (itemText.toLowerCase().includes("ice cream")) {
			return ({ emojis: ["🍦"] })
		} else if (itemText.toLowerCase().includes("candy")) {
			return ({ emojis: ["🍬"] })
		} else if (itemText.toLowerCase().includes("broccoli")) {
			return ({ emojis: ["🥦"] })
		} else if (itemText.toLowerCase().includes("ginger")) {
			return ({ emojis: ["🫚"] })
		} else if (itemText.toLowerCase().includes("garlic")) {
			return ({ emojis: ["🧄"] })
		} else if (itemText.toLowerCase().includes("onion")) {
			return ({ emojis: ["🧅"] })
		} else if (itemText.toLowerCase().includes("melon")) {
			return ({ emojis: ["🍈"] })
		} else if (itemText.toLowerCase().includes("tangerine")) {
			return ({ emojis: ["🍊"] })
		} else if (itemText.toLowerCase().includes("lemon")) {
			return ({ emojis: ["🍋"] })
		} else if (itemText.toLowerCase().includes("lime")) {
			return ({ emojis: ["🍈"] })
		} else if (itemText.toLowerCase().includes("blueberries") || itemText.toLowerCase().includes("blueberry")) {
			return ({ emojis: ["🫐"] })
		} else if (itemText.toLowerCase().includes("olive")) {
			return ({ emojis: ["🫒"] })
		} else if (itemText.toLowerCase().includes("coconut")) {
			return ({ emojis: ["🥥"] })
		} else if (itemText.toLowerCase().includes("cucumber") || itemText.toLowerCase().includes("zucchini")) {
			return ({ emojis: ["🥒"] })
		} else if (itemText.toLowerCase().includes("lettuce") || itemText.toLowerCase().includes("spinach") || itemText.toLowerCase().includes("choy")) {
			return ({ emojis: ["🥬"] })
		} else if (itemText.toLowerCase().includes("peas")) {
			return ({ emojis: ["🫛"] })
		} else if (itemText.toLowerCase().includes("naan")) {
			return ({ emojis: ["🫓"] })
		} else if (itemText.toLowerCase().includes("meat") || itemText.toLowerCase().includes("beef") || itemText.toLowerCase().includes("lamb") || itemText.toLowerCase().includes("veal") || itemText.toLowerCase().includes("pork")) {
			return ({ emojis: ["🥩"] })
		} else if (itemText.toLowerCase().includes("chicken")) {
			return ({ emojis: ["🍗"] })
		} else if (itemText.toLowerCase().includes("falafel")) {
			return ({ emojis: ["🧆"] })
		} else if (itemText.toLowerCase().includes("egg")) {
			return ({ emojis: ["🥚"] })
		} else if (itemText.toLowerCase().includes("salad")) {
			return ({ emojis: ["🥗"] })
		} else if (itemText.toLowerCase().includes("butter")) {
			return ({ emojis: ["🧈"] })
		} else if (itemText.toLowerCase().includes("salt")) {
			return ({ emojis: ["🧂"] })
		} else if (itemText.toLowerCase().includes("tin")) {
			return ({ emojis: ["🥫"] })
		} else if (itemText.toLowerCase().includes("rice")) {
			return ({ emojis: ["🍚"] })
		} else if (itemText.toLowerCase().includes("curry")) {
			return ({ emojis: ["🍛"] })
		} else if (itemText.toLowerCase().includes("chocolate")) {
			return ({ emojis: ["🍫"] })
		} else if (itemText.toLowerCase().includes("honey")) {
			return ({ emojis: ["🍯"] })
		} else if (itemText.toLowerCase().includes("milk")) {
			return ({ emojis: ["🥛"] })
		} else if (itemText.toLowerCase().includes("beer")) {
			return ({ emojis: ["🍺"] })
		} else if (itemText.toLowerCase().includes("wine")) {
			return ({ emojis: ["🍷"] })
		} else {
			return {}
		}
	}
	const confettiType = getConfettiType()
	if (confettiType.emojis) {
		jsConfetti.addConfetti(confettiType).then(removeCanvases)
	}
}