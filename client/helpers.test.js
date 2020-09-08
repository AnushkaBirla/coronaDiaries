const helpers = require('./helpers');

test('empty title input should return error message', () => {
    expect(helpers.isNotEmpty({
        "Title": "",
        "Subject": "test"
      })).toBe("Title must be filled out");
});