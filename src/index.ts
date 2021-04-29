const ignoredTerms = ['and'];

const mul = (x: number) => (time: number) => x * time;

const ms = mul(1000);

const second = (num: number) => ms(num);

const minute = (num: number) => num * ms(60);

const hour = (num: number) => minute(num * 60);

const day = (num: number) => hour(num * 24);

const week = (num: number) => day(num * 7);

const terms: { [term: string]: any } = {
  hr: hour,
  hrs: hour,
  hour,
  hours: hour,
  min: minute,
  mins: minute,
  minute,
  minutes: minute,
  day,
  days: day,
  sec: second,
  secs: second,
  second,
  seconds: second,
  week,
  weeks: week,
};

function tokenize(input: string) {
  const tokens = input.split(' ');

  return tokens.reduce<string[]>((acc, token) => {
    if (!ignoredTerms.includes(token)) {
      const stripped = token.replace(/\W/g, '');
      // If the token parses as a number, include it
      if (Number(stripped)) {
        acc.push(stripped);
      } else {
        // Otherwise split alphanumeric values and include
        const sivb = stripped.match(/(\d+|[^\d]+)/g);
        if (Array.isArray(sivb)) {
          acc.push(...sivb);
        }
      }
    }
    return acc;
  }, []);
}

function convert(input: string) {
  const tokens = tokenize(input);

  let ms = 0;
  for (let i = 0; i <= tokens.length; i++) {
    if (i % 2 === 0) {
      if (Number(tokens[i])) {
        const term = terms[tokens[i + 1]];
        ms += term(tokens[i]);
      }
    }
  }
  return ms;
}

export { convert as t };
