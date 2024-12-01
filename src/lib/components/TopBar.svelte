<script lang="ts">
	import { ExternalLink } from 'lucide-svelte';
	import { browser } from '$app/environment';

	const TopBarTexts = [
		'also try minecraft!',
		'also try terraria!',
		"it's not even the best game on the site",
		'tom says hi',
		'this game is known by the state of california',
		"what's good",
		'you are not a fish',
		'you are a fish',
		'you might be a fish',
		'🐇',
		'🐈',
		"🐟🐟🐟   🦈  nooo little fishes watch outtt there's a shark right behind youu.....",
		"rule 1 of scrolling text club: don't talk about scrolling text club",
		'rule 2: have fun and be yourself',
		'honorable steward, the crops are dying, and the children are going hungry, please stop reading the scrolling text',
		"if you can't be good, don't get caught!",
		'reticulating splines...',
		"that was a really good one, hope you didn't miss it",
		"you really have no idea how long this dumb scrolling text thing took me, like, seriously, oh my god, i was here for so long, there are entire gameplay systems in this game that took me less time to implement than this stupid text bar, please just take a second to appreciate it. i'll give you as much time as you need.                    alright, cool. thanks.",
		'your brain tricks you into thinking this text is moving',
		'antimatter dimensions ran so we could walk',
		"is your browser running slow? good, it'll be easier to catch",
		'think of a number between one and ten',
		'stan loona',
		"you should stream syzy's debut album 'the weight of the world'",
		"one day, something genuinely important is gonna be in this bar, and you're gonna miss it"
	];

	let topText = $state();

	let textElement: HTMLElement;

	let lastIndex = -1;
	const UpdateTopText = () => {
		textElement.style.transitionDuration = '0s';
		textElement.style.transform = 'translateX(0)';

		let index = 0;
		do {
			index = Math.floor(Math.random() * TopBarTexts.length);
		} while (index === lastIndex);

		topText = TopBarTexts[index];
		lastIndex = index;
	};

	if (browser) {
		let timesPlayed = parseInt(localStorage.getItem('times-played') ?? '0');
		localStorage.setItem('times-played', (timesPlayed + 1).toString());
		timesPlayed++;

		topText =
			timesPlayed === 1
				? "welcome! :) make sure to check this bar every so often, it's gonna contain some REALLY important information you DON'T wanna miss."
				: timesPlayed === 2
					? "oh, hey! you're back!"
					: timesPlayed === 3
						? 'back for a third time, i see!'
						: timesPlayed === 5
							? '5th time back! good to see you!'
							: timesPlayed === 10
								? "hey, it's your 10th time back! nice!"
								: timesPlayed === 20
									? '20th time back! always good to see you!'
									: timesPlayed === 50
										? 'welcome ba- hey, guess what! 50th time back! nice!'
										: timesPlayed === 100
											? 'dude i just ran the numbers and this is your 100th time back               please go outside               cheers though'
											: 'welcome back!';
	}

	// we do this in effect instead of up there ^ because it runs after DOM updates (and we check DOM stuff)
	$effect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		topText;

		let scrollDuration = textElement.getBoundingClientRect().width / 40;
		textElement.style.transitionDuration = `${scrollDuration}s`;
		textElement.style.transform = 'translateX(-100%)';
	});
</script>

<div
	class="grid h-12 w-full grid-cols-6 grid-rows-2 justify-between gap-x-2 border-b border-zinc-800 bg-black/25 px-4 text-sm lg:h-6 lg:grid-rows-1"
>
	<span class="col-span-2 flex items-center pt-1 font-mono lg:col-span-1 lg:pt-0.5">
		🐱&nbsp;
		<a class="flex items-center text-blue-300 hover:text-blue-400" target="_blank" href="https://tom.cafe">
			tom.cafe
			<ExternalLink class="h-3" />
		</a>
	</span>

	<p class="col-span-6 row-start-2 content-center text-center font-serif lg:col-span-4 lg:col-start-2 lg:row-start-1">
		Events will be shown here.
	</p>

	<div class="col-span-2 col-end-7 flex items-center overflow-hidden border-x border-zinc-800 pt-0.5 lg:col-span-1">
		<p
			class="w-fit whitespace-pre pl-[100%] pr-64 font-mono text-xs opacity-50 transition-transform ease-linear"
			bind:this={textElement}
			ontransitionend={UpdateTopText}
		>
			{topText}
		</p>
	</div>
</div>
