'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface POI {
  id: string;
  slug: string;
  title: { ru: string; en?: string };
  summary?: { ru: string; en?: string };
  visitTimeMin: number;
  accessibility: { mgn: boolean; stroller: boolean };
  media: any[];
}

export default function HomePage() {
  const [pois, setPOIs] = useState<POI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/poi`)
      .then(res => res.json())
      .then(data => {
        setPOIs(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching POIs:', err);
        setLoading(false);
      });
  }, []);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#F7F3E8' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#1E3A5F', color: 'white', padding: '2rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', fontFamily: 'PT Serif, serif', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>
            Троицкий храм г. Коломны
          </h1>
          <p style={{ color: '#d9e6f2', margin: 0 }}>
            Интерактивный путеводитель
          </p>
        </div>
      </header>

      {/* Quick Actions */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          <Link href="/map" style={{ 
            backgroundColor: 'white', 
            borderRadius: '12px', 
            padding: '1.5rem', 
            textAlign: 'center',
            textDecoration: 'none',
            color: '#374151',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            transition: 'box-shadow 0.2s'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🗺️</div>
            <h3 style={{ fontWeight: 500, margin: 0 }}>Карта</h3>
          </Link>

          <Link href="/routes" style={{ 
            backgroundColor: 'white', 
            borderRadius: '12px', 
            padding: '1.5rem', 
            textAlign: 'center',
            textDecoration: 'none',
            color: '#374151',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚶</div>
            <h3 style={{ fontWeight: 500, margin: 0 }}>Маршруты</h3>
          </Link>

          <Link href="/schedule" style={{ 
            backgroundColor: 'white', 
            borderRadius: '12px', 
            padding: '1.5rem', 
            textAlign: 'center',
            textDecoration: 'none',
            color: '#374151',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📅</div>
            <h3 style={{ fontWeight: 500, margin: 0 }}>Расписание</h3>
          </Link>

          <Link href="/qr-scanner" style={{ 
            backgroundColor: 'white', 
            borderRadius: '12px', 
            padding: '1.5rem', 
            textAlign: 'center',
            textDecoration: 'none',
            color: '#374151',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📱</div>
            <h3 style={{ fontWeight: 500, margin: 0 }}>Сканер</h3>
          </Link>
        </div>
      </section>

      {/* POI List */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem 2rem' }}>
        <h2 style={{ fontFamily: 'PT Serif, serif', fontSize: '1.5rem', fontWeight: 'bold', color: '#374151', marginBottom: '1.5rem' }}>
          Достопримечательности
        </h2>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ color: '#6B7280' }}>Загрузка...</p>
          </div>
        ) : pois.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ color: '#6B7280' }}>Нет доступных объектов. Проверьте подключение к API.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {pois.map((poi) => (
              <Link
                key={poi.id}
                href={`/poi/${poi.slug}`}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '1rem',
                  textDecoration: 'none',
                  color: 'inherit',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  transition: 'box-shadow 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontWeight: 500, color: '#374151', margin: '0 0 0.5rem 0' }}>
                      {poi.title.ru}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: '#6B7280', margin: '0 0 0.5rem 0', lineHeight: '1.5' }}>
                      {poi.summary?.ru}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        backgroundColor: '#EEF2FF', 
                        color: '#1E3A5F', 
                        padding: '0.25rem 0.5rem', 
                        borderRadius: '4px' 
                      }}>
                        ~{poi.visitTimeMin} мин
                      </span>
                      {poi.accessibility?.mgn && (
                        <span style={{ 
                          fontSize: '0.75rem', 
                          backgroundColor: '#F0FDF4', 
                          color: '#2F7D64', 
                          padding: '0.25rem 0.5rem', 
                          borderRadius: '4px' 
                        }}>
                          ♿ Доступно
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Donation CTA */}
      <section style={{ backgroundColor: '#FEF3C7', borderTop: '1px solid #E5E7EB', padding: '2rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'PT Serif, serif', fontSize: '1.25rem', fontWeight: 'bold', color: '#374151', margin: '0 0 0.5rem 0' }}>
            Поддержите наш приход
          </h3>
          <p style={{ color: '#6B7280', margin: '0 0 1rem 0' }}>
            Ваши пожертвования помогают поддерживать храм и развивать проекты прихода
          </p>
          <Link
            href="/donate"
            style={{
              display: 'inline-block',
              backgroundColor: '#C89B3C',
              color: 'white',
              fontWeight: 500,
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'background-color 0.2s'
            }}
          >
            Пожертвовать
          </Link>
        </div>
      </section>
    </main>
  );
}
