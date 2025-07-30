import requests
from faker import Faker
from io import BytesIO
import random

fake = Faker()

BASE_URL = "https://sample-service-name-alvt.onrender.com/api"
REGISTER_URL = f"{BASE_URL}/register"
TOKEN_URL = f"{BASE_URL}/token"
PROFILE_URL = f"{BASE_URL}/profile"
PROJECT_URL = f"{BASE_URL}/projects"

hashtags_pool = [
    "javascript", "react", "python", "flask", "css", "frontend",
    "backend", "api", "tailwind", "vite", "docker", "jwt", "postgres"
]

tech_roles = [
    "Full Stack Developer", "Frontend Engineer", "Backend Developer",
    "DevOps Engineer", "Data Scientist", "Mobile Developer", "UI/UX Designer"
]

tech_queries = [
    "technology", "developer", "programming", "coding", "laptop",
    "keyboard", "software", "terminal", "workspace", "server"
]


def generate_tech_title():
    tech_prefixes = ["Build a", "Create a", "Deploy a",
                     "Design a", "Optimize your", "Learn"]
    tech_topics = ["React App", "REST API", "Docker Workflow", "Tailwind Template",
                   "JWT Auth System", "Python CLI Tool", "PostgreSQL Dashboard"]
    return f"{random.choice(tech_prefixes)} {random.choice(tech_topics)}"


def generate_tech_description(hashtags):
    tag_str = ", ".join(hashtags)

    templates = [
        f"This project demonstrates the power of {tag_str} through a clean and responsive interface. Ideal for developers looking to sharpen their skills in modern web development.",
        f"Using {tag_str}, this app simulates a real-world product with authentication, state management, and dynamic routing. A solid addition to any developer’s portfolio.",
        f"A hands-on project built with {tag_str}, designed to reinforce concepts like API consumption, component design, and UI responsiveness.",
        f"This technical prototype leverages {tag_str} to create a full-stack application ready for scalable deployment. Perfect for practicing CI/CD integration.",
        f"With {tag_str}, this project combines frontend and backend logic in a seamless experience. It’s ideal for devs preparing for team-based environments.",
        f"A sandbox environment for experimenting with {tag_str}. It focuses on reusability, modular architecture, and clean coding principles.",
        f"By integrating {tag_str}, this build focuses on speed, performance optimization, and developer experience. Good for bootcamp students or solo devs.",
        f"This challenge-based app encourages the use of {tag_str} to solve real-world problems. Great for hackathons or code review practice.",
        f"Modern web technologies like {tag_str} power this collaborative project. It includes responsive design, protected routes, and deployment readiness.",
        f"A simple yet complete app using {tag_str}, aiming to teach the fundamentals of software design, scalability, and API integration.",
        f"Built with {tag_str}, this app offers dynamic features like form validation, protected routes, and asynchronous data handling. A go-to starter template.",
        f"This demo combines best practices in {tag_str}, following an MVC-like pattern and separating concerns for better code maintainability.",
        f"A team-friendly structure powered by {tag_str}, with a focus on reusable components, version control workflows, and testing support.",
        f"Learn how to use {tag_str} to build robust web applications, with dynamic content, RESTful APIs, and cloud-based deployment.",
        f"This application is structured using {tag_str} to illustrate database connectivity, JWT auth, and server-side rendering techniques.",
        f"Designed to improve tech stack fluency, this project blends {tag_str} into a real use case with routing, hooks, and fetch calls.",
        f"A technical exploration of {tag_str}, ideal for studying component lifecycles, performance tuning, and dev tool usage.",
        f"Created with {tag_str}, this app showcases how to build maintainable and responsive layouts with mobile-first design in mind.",
        f"This prototype emphasizes code quality and version control using {tag_str}, perfect for pair programming and clean Git workflows.",
        f"Take a deep dive into {tag_str} while building this feature-rich interface. Learn how to manage state, structure files, and deploy effectively."
    ]

    return random.choice(templates)


def get_multiple_images(count=2):
    TECH_IMAGE_URLS = [
        "https://images.unsplash.com/photo-1518770660439-4636190af475",
        "https://images.unsplash.com/photo-1581090700227-1e8e8f141318",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        "https://images.unsplash.com/photo-1605902711622-cfb43c4437d4",
        "https://images.unsplash.com/photo-1526378722786-3b1d6f9e4c47",
        "https://images.unsplash.com/photo-1555949963-aa79dcee981d",
        "https://images.unsplash.com/photo-1522199710521-72d69614c702",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
        "https://images.unsplash.com/photo-1537432376769-00a0035b9683",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7",
        "https://images.unsplash.com/photo-1537432376769-00a0035b9683",
        "https://images.unsplash.com/photo-1558888401-1b299ddc48ec",
        "https://images.unsplash.com/photo-1583337130417-3346a1a4a9bd",
        "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
        "https://images.unsplash.com/photo-1590608897129-79da98d1599c",
        "https://images.unsplash.com/photo-1585079542204-52cacf0315ec",
        "https://images.unsplash.com/photo-1611926653458-09294b3142c8",
        "https://images.unsplash.com/photo-1555949963-aa79dcee981d"
    ]

    selected_urls = random.sample(
        TECH_IMAGE_URLS, k=min(count, len(TECH_IMAGE_URLS)))
    images = []

    for i, url in enumerate(selected_urls):
        full_url = f"{url}?w=600&h=400&fit=crop"
        try:
            res = requests.get(full_url, stream=True, headers={
                               "User-Agent": "Mozilla/5.0"})
            if res.status_code == 200:
                img = BytesIO(res.content)
                img.name = f"tech_img_{i+1}.jpg"
                images.append(img)
        except Exception as e:
            print(f"❌ Error al descargar imagen: {e}")

    return images


num_users = 6

for i in range(num_users):
    username = fake.user_name()
    email = fake.email()
    password = "123456"
    avatar_url = f"https://api.dicebear.com/7.x/pixel-art/svg?seed={username}"

    print(f"\n🔸 Creando usuario {i+1}: {username} | {email}")

    # 1. Registrar usuario
    res = requests.post(REGISTER_URL, json={
        "username": username,
        "email": email,
        "password": password
    })

    if res.status_code != 201:
        print(f"❌ Registro fallido: {res.status_code} - {res.text}")
        continue

    # 2. Obtener token
    token_res = requests.post(TOKEN_URL, json={
        "email": email,
        "password": password
    })

    if token_res.status_code != 200:
        print(f"❌ Login fallido: {token_res.text}")
        continue

    token = token_res.json()["token"]

    # 3. Actualizar perfil
    requests.put(PROFILE_URL,
                 json={
                     "avatar_url": avatar_url,
                     "bio": fake.catch_phrase(),
                     "location": fake.city(),
                     "role": random.choice(tech_roles)
                 },
                 headers={"Authorization": f"Bearer {token}"}
                 )

    # 4. Crear hashtags aleatorios
    random_hashtags = random.sample(hashtags_pool, k=random.randint(2, 4))
    hashtags_str = ", ".join(f"#{tag}" for tag in random_hashtags)

    # 5. Descargar imágenes tech
    images = get_multiple_images(count=random.randint(2, 3))
    if not images:
        print("⚠️ No se pudieron descargar imágenes")
        continue

    # 6. Crear proyecto tech
    project_data = {
        "title": generate_tech_title(),
        "description": generate_tech_description(random_hashtags),
        "hashtags": hashtags_str,
        "stackblitz_url": "https://stackblitz.com/edit/placeholder"
    }

    files = []
    for idx, img in enumerate(images):
        files.append(
            ("image_files", (f"{username}_{i}_img{idx+1}.jpg", img, "image/jpeg")))

    project_res = requests.post(
        PROJECT_URL,
        data=project_data,
        files=files,
        headers={"Authorization": f"Bearer {token}"}
    )

    if project_res.status_code in [200, 201]:
        print(f"✅ Proyecto creado para {username}")
    else:
        print(
            f"⚠️ Error al crear proyecto: {project_res.status_code} - {project_res.text}")
