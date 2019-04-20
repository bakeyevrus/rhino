import createIdCounter from './IdCounter';

// The logic of counter.nextNumber() is trivial, no need to test it
describe('ID counter', () => {
  it('should increment "a" letter, "b" expected', () => {
    const expectedLetter = 'b';
    const counter = createIdCounter('a', '-1');

    expect(counter.nextLetter()).toEqual(expectedLetter);
  });

  it('should increment "z" letter, "aa" expected', () => {
    const expectedLetter = 'aa';
    const counter = createIdCounter('z', '-1');

    expect(counter.nextLetter()).toEqual(expectedLetter);
  });

  it('should increment "asd" string, "ase" expected', () => {
    const expectedLetter = 'ase';
    const counter = createIdCounter('asd', '-1');

    expect(counter.nextLetter()).toEqual(expectedLetter);
  });

  it('should increment "asz" string, "ata" expected', () => {
    const expectedLetter = 'ata';
    const counter = createIdCounter('asz', '-1');

    expect(counter.nextLetter()).toEqual(expectedLetter);
  });

  it('should create start letter and number if no arguments passed to factory function', () => {
    const expectedLetter = 'a';
    const expectedNumber = '0';
    const counter = createIdCounter();

    expect(counter.nextLetter()).toEqual(expectedLetter);
    expect(counter.nextNumber()).toEqual(expectedNumber);
  });

  it('should increment id 12 to 13', () => {
    const actualId = '12';
    const expectedId = '13';
    const counter = createIdCounter('a', actualId);

    expect(counter.nextNumber()).toEqual(expectedId);
  });

  it('should increment id 9 to 00', () => {
    const actualId = '9';
    const expectedId = '00';
    const counter = createIdCounter('a', actualId);

    expect(counter.nextNumber()).toEqual(expectedId);
  });
});
