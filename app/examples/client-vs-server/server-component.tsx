export async function getData() {
  const res = await fetch('https://httpbin.org/get');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const ServerComponent = async () => {
  const data = await getData();
  return <div>{`response: ${JSON.stringify(data)}`}</div>;
};

export default ServerComponent;
