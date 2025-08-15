const { axe, toHaveNoViolations } = require('jest-axe');

expect.extend(toHaveNoViolations);

test('sample HTML is accessible', async () => {
  document.body.innerHTML = `
    <main>
      <label for="name">Name</label>
      <input id="name" />
    </main>
  `;
  const results = await axe(document.body);
  expect(results).toHaveNoViolations();
});
