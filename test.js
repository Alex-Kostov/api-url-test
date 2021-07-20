const request = require('supertest')('http://143.198.180.127/get-size/');
const fs = require('fs');

const data = {
	invalidMobileUrls: [],
	invalidDesktopUrls: [],
};


let urls = [
	'10-babies-fighting-for-lives/',
	'10-deeply-troubling-facts-about-popular-childrens-toys/',
	'10-horrifying-pieces-of-old-fashioned-parenting-advice/',
	'10-naughty-kid-behaviors-that-are-actually-normal-developmental-stages/',
	'10-very-real-tweets-about-pregnancy-cravings-that-will-make-all-moms-say-ive-been-there/',
	'10-year-old-girls-iconic-christmas-list-goes-viral-again-after-asking-for-ridiculous-amounts-of-stuff/',
	'11-things-that-speak-truth-to-the-parenting-soul/',
	'12-times-children-were-more-savage-than-any-adult-could-ever-be/',
	'13-epic-bad-date-stories-so-bad-youll-want-to-grab-a-drink-before-reading-them/',
	'13-year-old-boy-earns-fourth-associates-degree-as-he-becomes-californias-youngest-college-graduate-ever/',
	'13-year-old-girl-is-punished-for-her-pro-lgbt-shirt-after-her-school-calls-it-distracting/',
	'14-parents-revealed-their-sneakiest-secrets-when-it-comes-to-raising-kids/',
	'14-stories-about-the-strictest-real-parents-that-ever-lived/',
	'14-year-old-chicago-girl-earns-her-masters-degree/',
	'15-things-you-judged-parents-for-before-having-sweet-little-monsters-of-your-own/',
	'16-times-t-shirts-matched-to-create-an-awesome-story/',
	'16-year-old-left-in-tears-at-prom-after-bully-pours-juice-over-her-head/',
	'17-mind-blowing-facts-about-twins-that-seem-too-weird-to-be-true/',
	'17-year-old-close-aging-foster-care-begs-adopted/',
	'18-actually-thoughtful-mothers-day-gifts-on-amazon/',
	'18-signs-can-help-understand-baby-better/',
	'19-ways-to-deal-with-your-spouse-who-has-become-an-overbearing-helicopter-parent/',
	'2-year-old-boy-adopted-over-zoom-after-pandemic-canceled-court-hearings/',
	'20-details-about-pregnancy-that-no-one-warns-you-about/',
	'20-genius-inventions-that-will-make-parents-lives-so-much-easier/',
	'20-illegal-baby-names-that-we-cant-believe-people-actually-tried-to-name-their-kids/',
	'20-of-the-funniest-parents-on-twitter-hilariously-describe-mothers-day/',
	'20-people-share-the-worst-mothers-day-gifts-they-ever-got/',
	'20-secrets-about-the-reality-of-pregnancy-no-one-tells-you-before-you-have-a-kid/',
	'20-tweets-about-the-messiness-of-parenthood-that-are-a-almost-too-real/',
	'2019-problems-that-simply-didnt-exist-in-1989/',
	'2019s-new-trend-is-young-women-rocking-their-natural-gray-hair/',
	'21-years-after-breaking-up-this-couple-got-back-together-to-take-baby-photos-with-their-adult-son/',
	'23-photos-that-highlight-the-hilarious-differences-in-the-way-moms-and-dads-raise-kids/',
	'23-year-old-partially-paralyzed-cracking-neck-wrong-way/',
	'24-celeb-mom-pics-that-prove-motherhood-isnt-easy-even-if-youre-famous/',
	'24-ridiculous-rules-that-parents-have-made-for-their-misbehaving-children/',
	'25-books-from-childhood-you-forgot-how-much-you-loved/',
	'25-people-who-got-creatively-genius-with-their-parenting/',
	'25-women-reveal-what-childbirth-really-feels-like-ia/',
	'250000-angry-game-of-thrones-fans-petition-for-final-season-to-be-remadeadd_slides50/',
	'27-amazing-parenting-hacks/',
	'29-year-age-gap/',
	'3-year-old-boy-rescued-from-dirty-house-after-spending-three-days-alone-without-food/',
	'3-year-old-girl-lifted-to-the-sky-after-getting-caught-on-kite/',
	'3-year-old-makes-his-military-mom-disobey-orders-they-hadnt-hugged-in-9-months/',
	'3-year-old-picks-horror-movie-the-nun-as-theme-for-her-birthday-party/',
	'3-year-old-whose-mom-died-saving-her-from-hurricane-harvey-is-getting-support-from-an-unlikely-source/',
	'34000-raised-for-hero-waitress-who-saved-boy-from-abusive-parents/',
	'35-genius-inventions-moms-need/',
];

for (let i = 0; i < urls.length; i++) {

	let url = urls[i];

	describe('GET http://s38094.p1167.sites.pressdns.com/' + url , async function () {
		this.timeout(60000);
		it("log url:" + url, async () => {
			const response = await request.get('http://s38094.p1167.sites.pressdns.com/' + url);
			let json = JSON.parse(response.text);
			if ( json.hasOwnProperty('desktop') && json.hasOwnProperty('mobile')) {
				let desktop = json.desktop;
				let mobile = json.mobile;

				for (const obj of desktop) {
					for (const size in obj) {
						if ( size === 'height' && obj[size] < 2 ) {
							data.invalidDesktopUrls.push('http://143.198.180.127/get-size/http://s38094.p1167.sites.pressdns.com/' + url);
							console.log('~~~~~~Invalid values returned~~~~~~');
						}
						if( size === 'height' ) {
							console.log(`${size}: ${obj[size]}`);
						}
					}
				}

				for (const obj of mobile) {
					for (const size in obj) {
						if ( size === 'height' && obj[size] < 2 ) {
							data.invalidMobileUrls.push('http://143.198.180.127/get-size/http://s38094.p1167.sites.pressdns.com/' + url);
							console.log('~~~~~~Invalid values returned~~~~~~');
						}
						if( size === 'height' ) {
							console.log(`${size}: ${obj[size]}`);
						}
					}
				}

			}
		});
	});
}
fs.writeFileSync('invalid-urls.js',JSON.stringify(data));
