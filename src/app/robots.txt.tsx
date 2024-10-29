export const GET = async () => {
    const robots = `
  User-agent: *
  Disallow:
  Allow: /
    `;
    
    return new Response(robots, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  };
  