"use client";

export default function PageHeader({ title, subtitle }) {
  return (
    <header className="page-header">
      <div className="page-header-left">
        <h1 className="page-header-title">{title}</h1>
        {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
      </div>
    </header>
  );
}

