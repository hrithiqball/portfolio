import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Harith Iqbal - Full Stack Developer'
export const size = {
  width: 1200,
  height: 630
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          padding: '40px'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            flex: 1
          }}
        >
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '20px',
              lineHeight: '1.1'
            }}
          >
            Harith Iqbal
          </h1>
          <p
            style={{
              fontSize: '36px',
              color: '#94a3b8',
              margin: '0 0 30px 0'
            }}
          >
            Full Stack Developer
          </p>
          <div
            style={{
              display: 'flex',
              gap: '15px',
              flexWrap: 'wrap'
            }}
          >
            <div
              style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                borderRadius: '6px',
                color: 'white',
                fontSize: '18px'
              }}
            >
              React
            </div>
            <div
              style={{
                padding: '8px 16px',
                backgroundColor: '#10b981',
                borderRadius: '6px',
                color: 'white',
                fontSize: '18px'
              }}
            >
              Node.js
            </div>
            <div
              style={{
                padding: '8px 16px',
                backgroundColor: '#8b5cf6',
                borderRadius: '6px',
                color: 'white',
                fontSize: '18px'
              }}
            >
              TypeScript
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '4px solid rgba(255, 255, 255, 0.2)',
            marginLeft: '40px'
          }}
        >
          <div
            style={{
              fontSize: '120px',
              color: 'white'
            }}
          >
            👨‍💻
          </div>
        </div>
      </div>
    ),
    {
      ...size
    }
  )
}
