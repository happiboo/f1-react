import React from 'react'

export default function ModulesTable() {
  const modules = [
    { id: 'MOD-01A', name: 'Monocoque Strain Analytics', desc: 'Monitors real-time carbon composite load distributions and deflection levels across the chassis structural nodes.' },
    { id: 'MOD-02F', name: 'MGU-H Core Synchronizer', desc: 'Controls harvesting efficiency of the exhaust gas heat generator, matching turbo compressor output speeds.' },
    { id: 'MOD-02K', name: 'MGU-K KERS deployer', desc: 'Directs kinetic energy recovery deployments of 120kW to the drivetrain during corner exit traction events.' },
    { id: 'MOD-03W', name: 'Active Aero Wind Tunnel Sync', desc: 'Bridges physical wind-tunnel sensor outputs to our cloud-based CFD simulator environments for instantaneous validation.' },
    { id: 'MOD-04D', name: 'Tire Thermal Core Diagnostic', desc: 'Calculates inner carcass and external surface temperature deviations to prevent blister or grain patterns.' },
    { id: 'MOD-05T', name: 'Telemetry Packet Compressor', desc: 'Compresses high-frequency telemetry packages before broadcasting to pit lane consoles via active RF streams.' }
  ]

  return (
    <section id="reports-section" style={{ marginBottom: 40 }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.65rem',
        color: 'rgba(255, 255, 255, 0.3)',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: 16
      }}>
        Chassis & Telemetry Modules Matrix
      </div>

      <div style={{
        background: 'rgba(13, 13, 13, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        overflowX: 'auto'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          textAlign: 'left',
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.85rem'
        }}>
          <thead>
            <tr style={{
              background: 'rgba(255, 255, 255, 0.02)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <th style={{
                padding: '16px 24px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.7rem',
                color: '#DC0000',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                width: '120px'
              }}>
                Module ID
              </th>
              <th style={{
                padding: '16px 24px',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#ffffff'
              }}>
                Module Name
              </th>
              <th style={{
                padding: '16px 24px',
                color: 'rgba(255, 255, 255, 0.6)',
                fontWeight: 400
              }}>
                System Description / Action Specs
              </th>
            </tr>
          </thead>
          <tbody>
            {modules.map((m, i) => (
              <tr
                key={m.id}
                style={{
                  borderBottom: i === modules.length - 1 ? 'none' : '1px solid rgba(255, 255, 255, 0.04)',
                  background: i % 2 === 0 ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                  transition: 'background 0.2s'
                }}
                className="table-row"
              >
                <td style={{
                  padding: '16px 24px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.75rem',
                  color: '#ffffff',
                  fontWeight: 500
                }}>
                  {m.id}
                </td>
                <td style={{
                  padding: '16px 24px',
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: '#ffffff',
                  fontWeight: 500
                }}>
                  {m.name}
                </td>
                <td style={{
                  padding: '16px 24px',
                  color: 'rgba(255, 255, 255, 0.5)',
                  lineHeight: 1.5
                }}>
                  {m.desc}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Hover styles for table row */}
        <style dangerouslySetInnerHTML={{__html: `
          .table-row:hover {
            background: rgba(220, 0, 0, 0.03) !important;
          }
        `}} />
      </div>
    </section>
  )
}
