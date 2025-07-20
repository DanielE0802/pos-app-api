# 📬 Módulo de Correos Ally360

Este módulo gestiona el envío de correos transaccionales y operativos en Ally360. Utiliza `@nestjs-modules/mailer` con plantillas Handlebars estructuradas en `partials` para reutilización visual.

---

## ✨ Características
- Plantillas modulares con `head`, `header`, `footer`
- Envío de correos para autenticación, inventario y reportes

---

## 📂 Estructura
```
src/modules/mail/
│
├── templates/
│   ├── auth/
│   │   ├── activation-account.hbs
│   │   ├── req-reset-password.hbs
│   │   ├── password-reset-success.hbs
│   │   ├── account-deactivated.hbs
│   │   └── register-success.hbs
│   ├── inventory/
│   │   ├── stock-low.hbs
│   │   ├── stock-out.hbs
│   │   └── transfer-complete.hbs
│   ├── report/
│   │   ├── daily-summary.hbs
│   │   ├── monthly-summary.hbs
│   │   └── custom-generated.hbs
│   └── partials/
│       ├── head.hbs
│       ├── header.hbs
│       └── footer.hbs
```

---

## 📚 Documentación técnica de correos

Consulta la tabla completa de correos en [Notion → Correos Ally360](https://www.notion.so/Correos-Ally360) *(actualizar con URL real)*

---

## 🧪 Probar envío manual
Se puede usar temporalmente `MailTestController` para pruebas manuales:
```bash
POST /api/v1/mail/test/welcome
```

---

## 🔧 Variables necesarias en `.env`
```
SMTP_HOST=
SMTP_PORT=
SMTP_SECURE=true
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=no-reply@ally360.com
```

---

## 🧼 Buenas prácticas
- Usa clases CSS, no estilos en línea
- Cada plantilla debe tener su versión `text/plain` como comentario o alternativa
- Mantén los templates separados por dominio (auth, inventory, etc.)
- Usa constantes para las definiciones (`MailTemplates`)

---

## 🧩 Pendientes futuros
- Adjuntar PDFs (reportes)
- Traducciones automáticas si se ofrece localización
- Tests automatizados de contenido de plantillas