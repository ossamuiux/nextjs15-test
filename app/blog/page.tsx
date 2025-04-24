export default async function Blog() {
  await new Promise((resolve) => {
    setTimeout(() => resolve('delay'), 2000);
  });

  return (
    <main className="p-[30px]">
      <h2>My blog</h2>
    </main>
  );
}
