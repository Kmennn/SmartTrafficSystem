<div align="center">

```
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║     ███████╗███╗   ███╗ █████╗ ██████╗ ████████╗                ║
║     ██╔════╝████╗ ████║██╔══██╗██╔══██╗╚══██╔══╝                ║
║     ███████╗██╔████╔██║███████║██████╔╝   ██║                   ║
║     ╚════██║██║╚██╔╝██║██╔══██║██╔══██╗   ██║                   ║
║     ███████║██║ ╚═╝ ██║██║  ██║██║  ██║   ██║                   ║
║     ╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝                   ║
║                                                                  ║
║     ████████╗██████╗  █████╗ ███████╗███████╗██╗ ██████╗        ║
║     ╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██╔════╝██║██╔════╝        ║
║        ██║   ██████╔╝███████║█████╗  █████╗  ██║██║              ║
║        ██║   ██╔══██╗██╔══██║██╔══╝  ██╔══╝  ██║██║              ║
║        ██║   ██║  ██║██║  ██║██║     ██║     ██║╚██████╗        ║
║        ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝     ╚═╝ ╚═════╝        ║
║                                                                  ║
║          TACTICAL VIOLATION COMMAND  //  v1.0.0                  ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

**Real-time speed violation detection and enforcement system**

[![STATUS](https://img.shields.io/badge/STATUS-OPERATIONAL-brightgreen?style=flat-square&labelColor=0a0c0a)](https://smarttrafficsystem.onrender.com)
[![DEPLOYMENT](https://img.shields.io/badge/DEPLOYED_ON-RENDER-46E3B7?style=flat-square&labelColor=0a0c0a)](https://smarttrafficsystem.onrender.com)
[![DATABASE](https://img.shields.io/badge/DATABASE-POSTGRESQL-336791?style=flat-square&labelColor=0a0c0a)](https://www.postgresql.org/)
[![FRAMEWORK](https://img.shields.io/badge/FRAMEWORK-SPRING_BOOT_3.2-6DB33F?style=flat-square&labelColor=0a0c0a)](https://spring.io/projects/spring-boot)
[![JAVA](https://img.shields.io/badge/JAVA-17-ED8B00?style=flat-square&labelColor=0a0c0a)](https://openjdk.org/)

</div>

---

## // MISSION BRIEFING

SmartTraffic is a backend-powered traffic violation detection system built with **Spring Boot** and **PostgreSQL**. It intercepts vehicle speed data in real-time, identifies violations, calculates tiered fines, and logs all records to a persistent database.

The system features a **tactical HUD-style web interface** for submitting vehicle scans and reviewing the violation database — no templates, no filler, just the operational tool.

**Live Deployment** — [smarttrafficsystem.onrender.com](https://smarttrafficsystem.onrender.com)

---

## // SYSTEM CAPABILITIES

```
CAPABILITY                    STATUS
─────────────────────────────────────────
Real-time speed analysis      ACTIVE
Tiered fine calculation       ACTIVE
Emergency vehicle exemption   ACTIVE
PostgreSQL persistence        ACTIVE
Swagger/OpenAPI docs          ACTIVE
Docker containerization       ACTIVE
Cloud deployment (Render)     ACTIVE
Tactical HUD interface        ACTIVE
```

---

## // FINE STRUCTURE

| Speed Range     | Classification | Fine Amount |
|:----------------|:---------------|:------------|
| 81 – 100 km/h  | TIER 1         | Rs. 1,000   |
| 101 – 120 km/h | TIER 2         | Rs. 2,000   |
| 121+ km/h       | TIER 3         | Rs. 5,000   |
| Emergency unit  | EXEMPT         | No fine     |
| Under 80 km/h   | CLEAR          | No fine     |

---

## // API ENDPOINTS

```
METHOD   ENDPOINT                  DESCRIPTION
───────────────────────────────────────────────────────────
POST     /traffic/check            Submit vehicle for scan
GET      /traffic/violations       Retrieve all violations
GET      /swagger-ui/index.html    Interactive API docs
```

### Request Payload — `POST /traffic/check`

```json
{
  "vehicleId": "MH-12-AB-1234",
  "speed": 127.5,
  "zone": "Highway NH-48",
  "emergency": false
}
```

### Response — Violation Detected

```json
{
  "id": 1,
  "vehicleId": "MH-12-AB-1234",
  "speed": 127.5,
  "zone": "Highway NH-48",
  "fine": 5000
}
```

### Response — No Violation

```
null
```

---

## // TECH STACK

```
COMPONENT          TECHNOLOGY
──────────────────────────────────────
Runtime            Java 17
Framework          Spring Boot 3.2.5
Database           PostgreSQL 18
ORM                Spring Data JPA
API Docs           Springdoc OpenAPI
Container          Docker (multi-stage)
Hosting            Render
Frontend           Vanilla HTML/CSS/JS
Font               Rajdhani + Share Tech Mono
```

---

## // PROJECT STRUCTURE

```
SmartTrafficSystem/
├── src/
│   └── main/
│       ├── java/com/traffic/
│       │   ├── DemoApplication.java          // Entry point
│       │   ├── controller/
│       │   │   ├── HomeController.java       // Root redirect
│       │   │   └── TrafficController.java    // API endpoints
│       │   ├── model/
│       │   │   ├── VehicleEvent.java         // Input model
│       │   │   └── Violation.java            // JPA entity
│       │   ├── repository/
│       │   │   └── ViolationRepository.java  // Database layer
│       │   └── service/
│       │       └── TrafficService.java       // Business logic
│       └── resources/
│           ├── static/
│           │   ├── index.html                // Tactical HUD UI
│           │   ├── styles.css                // MW theme styles
│           │   └── script.js                 // Frontend logic
│           └── application.properties        // Config
├── Dockerfile
├── pom.xml
└── README.md
```

---

## // LOCAL DEPLOYMENT

### Prerequisites
- Java 17+
- Maven 3.9+
- PostgreSQL (local or remote)

### Execute

```bash
# Clone the repository
git clone https://github.com/Kmennn/SmartTrafficSystem.git
cd SmartTrafficSystem

# Set database credentials
export DB_URL=jdbc:postgresql://localhost:5432/traffic
export DB_USER=postgres
export DB_PASSWORD=password

# Build and run
./mvnw spring-boot:run
```

Server starts at `http://localhost:8080`

### Docker

```bash
docker build -t smart-traffic .
docker run -p 8080:8080 \
  -e DB_URL=jdbc:postgresql://host:5432/traffic \
  -e DB_USER=postgres \
  -e DB_PASSWORD=password \
  smart-traffic
```

---

## // RENDER DEPLOYMENT

1. Push code to GitHub
2. Create a **PostgreSQL** database on Render
3. Create a **Web Service** (Docker) pointing to this repo
4. Set environment variables: `DB_URL`, `DB_USER`, `DB_PASSWORD`
5. Deploy — Render handles the rest

---

<div align="center">

```
╔══════════════════════════════════════════════════╗
║  CLASSIFICATION: UNCLASSIFIED                    ║
║  SMART TRAFFIC SYSTEM // SPRING BOOT + POSTGRES  ║
║  DEPLOYED ON RENDER // STATUS: OPERATIONAL       ║
╚══════════════════════════════════════════════════╝
```

**Built by [Kmennn](https://github.com/Kmennn)**

</div>
