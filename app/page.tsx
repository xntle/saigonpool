"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import LiquidCursor from "./cursor";
import WaterCanvas from "./water";

const NAV = ["Dịch Vụ", "Dự Án", "Quy Trình", "Liên Hệ"];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const currentIdx = useRef(0);

  const goTo = (i: number) => {
    const el = sectionRefs.current[i];
    if (!el) return;
    currentIdx.current = i;
    setActive(i);
    el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = sectionRefs.current.indexOf(entry.target as HTMLElement);
            if (i !== -1) {
              setActive(i);
              currentIdx.current = i;
            }
          }
        });
      },
      { threshold: 0.4 }
    );
    sectionRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const ref = (i: number) => (el: HTMLElement | null) => {
    sectionRefs.current[i] = el;
  };

  return (
    <>
      {/* NAV */}
      <nav
        className="nav-pad fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-500"
        style={{
          padding: "28px 56px",
          background:
            active > 0 && active < 4 ? "rgba(8,8,8,0.85)" : "transparent",
          backdropFilter: active > 0 && active < 4 ? "blur(16px)" : "none",
        }}
      >
        <button onClick={() => goTo(0)}>
          <Image
            src="/logo.png"
            alt="Saigon Pool"
            width={100}
            height={40}
            style={{ objectFit: "contain" }}
          />
        </button>

        {/* Desktop nav */}
        <ul className="nav-links flex items-center gap-12">
          {NAV.map((label, i) => (
            <li key={label}>
              <button
                onClick={() => goTo(i + 1)}
                className="text-xs uppercase tracking-widest relative group/nav"
                style={{
                  color: "white",
                  textShadow: "0 1px 8px rgba(0,0,0,0.6)",
                }}
              >
                {label}
                <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-white transition-all duration-300 group-hover/nav:w-full" />
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn flex flex-col justify-center gap-[5px]"
          onClick={() => setMenuOpen((o) => !o)}
          style={{ width: 24, padding: 0, background: "none", border: "none" }}
        >
          <span
            style={{
              display: "block",
              width: menuOpen ? "100%" : "100%",
              height: 1,
              background: "white",
              transition: "transform 0.3s, opacity 0.3s",
              transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: "100%",
              height: 1,
              background: "white",
              transition: "opacity 0.3s",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: "block",
              width: "100%",
              height: 1,
              background: "white",
              transition: "transform 0.3s, opacity 0.3s",
              transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="mobile-menu-overlay fixed inset-0 z-40 flex flex-col items-center justify-center gap-10"
          style={{
            background: "rgba(4,4,4,0.96)",
            backdropFilter: "blur(20px)",
          }}
        >
          {NAV.map((label, i) => (
            <button
              key={label}
              onClick={() => {
                goTo(i + 1);
                setMenuOpen(false);
              }}
              className="text-white uppercase font-light tracking-[0.4em] text-xl transition-opacity duration-200"
              style={{ opacity: active === i + 1 ? 1 : 0.45 }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* SIDE DOTS */}
      <div className="side-dots fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-[10px]">
        {[...Array(5)].map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: 5,
              height: active === i ? 20 : 5,
              borderRadius: 99,
              background: active === i ? "white" : "rgba(255,255,255,0.22)",
              transition: "all 0.35s ease",
              display: "block",
            }}
          />
        ))}
      </div>

      {/* SCROLL CONTAINER */}
      <div ref={containerRef}>
        {/* ─── HERO ─── */}
        <section
          ref={ref(0)}
          className="relative h-screen w-full overflow-hidden flex items-center justify-center"
          style={{ scrollSnapAlign: "start", background: "#000" }}
        >
          <Image
            src="/videos/background.png"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />

          <div className="relative z-10 flex flex-col items-center gap-5">
            <Image
              src="/logo.png"
              alt="Saigon Pool"
              width={280}
              height={112}
              style={{ objectFit: "contain" }}
            />
            <p className="text-white/50 text-[11px] tracking-[0.45em] uppercase">
              Premium Swimming Pool & Saunas Since 1998
            </p>
          </div>

          <button
            onClick={() => goTo(1)}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="text-white/30 text-[10px] tracking-[0.5em] uppercase">
              Khám Phá
            </span>
            <div
              className="w-px h-10 animate-pulse"
              style={{ background: "rgba(255,255,255,0.25)" }}
            />
          </button>
        </section>

        {/* ─── SERVICES ─── */}
        <section
          ref={ref(1)}
          id="dich-vu"
          className="h-screen w-full flex items-center justify-center"
          style={{ scrollSnapAlign: "start", background: "#0b0b0b" }}
        >
          <div
            className="section-inner"
            style={{ width: "100%", maxWidth: 960, padding: "0 56px" }}
          >
            <Label>Dịch Vụ</Label>
            <h2
              className="section-title text-white font-light text-center"
              style={{
                fontSize: "2.6rem",
                letterSpacing: "0.02em",
                margin: "20px 0 64px",
              }}
            >
              Những Gì Chúng Tôi Làm
            </h2>

            <div
              className="services-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 1,
                background: "rgba(255,255,255,0.07)",
              }}
            >
              {[
                {
                  t: "Thiết Kế Hồ Bơi",
                  d: "Thiết kế theo yêu cầu, tối ưu không gian và thẩm mỹ cho từng công trình riêng biệt.",
                },
                {
                  t: "Thi Công & Xây Dựng",
                  d: "Đội ngũ thi công chuyên nghiệp với vật liệu cao cấp và quy trình kiểm soát chặt chẽ.",
                },
                {
                  t: "Bảo Trì & Vận Hành",
                  d: "Dịch vụ bảo trì định kỳ, đảm bảo hồ bơi luôn trong tình trạng hoàn hảo.",
                },
              ].map((s) => (
                <div
                  key={s.t}
                  className="group transition-colors duration-400"
                  style={{ background: "#0b0b0b", padding: "44px 36px 44px" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.03)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#0b0b0b")
                  }
                >
                  <div
                    style={{
                      width: 28,
                      height: 1,
                      background: "rgba(255,255,255,0.3)",
                      marginBottom: 32,
                      transition: "width 0.3s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.width = "56px")}
                  />
                  <h3
                    className="text-white font-light"
                    style={{
                      fontSize: "1rem",
                      letterSpacing: "0.04em",
                      marginBottom: 16,
                    }}
                  >
                    {s.t}
                  </h3>
                  <p
                    className="text-sm leading-7"
                    style={{ color: "rgba(255,255,255,0.38)" }}
                  >
                    {s.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PORTFOLIO ─── */}
        <section
          ref={ref(2)}
          id="du-an"
          className="w-full flex flex-col"
          style={{ background: "#080808", padding: "80px 0 64px" }}
        >
          <div
            className="portfolio-header"
            style={{ padding: "0 56px", marginBottom: 40 }}
          >
            <Label>Dự Án</Label>
            <h2
              className="section-title text-white font-light text-center"
              style={{
                fontSize: "2.6rem",
                letterSpacing: "0.02em",
                margin: "20px 0 0",
              }}
            >
              Công Trình Tiêu Biểu
            </h2>
          </div>
          <ExpandingGrid />
        </section>

        {/* ─── PROCESS ─── */}
        <section
          ref={ref(3)}
          id="quy-trinh"
          className="h-screen w-full flex items-center justify-center"
          style={{ scrollSnapAlign: "start", background: "#0b0b0b" }}
        >
          <div
            className="section-inner"
            style={{ width: "100%", maxWidth: 960, padding: "0 56px" }}
          >
            <Label>Quy Trình</Label>
            <h2
              className="section-title text-white font-light text-center"
              style={{
                fontSize: "2.6rem",
                letterSpacing: "0.02em",
                margin: "20px 0 72px",
              }}
            >
              Cách Chúng Tôi Làm Việc
            </h2>

            <div
              className="process-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: 32,
              }}
            >
              {[
                {
                  n: "01",
                  t: "Giới Thiệu",
                  d: "Hơn 26 năm kinh nghiệm tư vấn, thiết kế và thi công hồ bơi, khu vui chơi nước và spa với thiết bị nhập khẩu từ Tây Ban Nha, Úc, New Zealand và Thụy Điển.",
                },
                {
                  n: "02",
                  t: "Khảo Sát",
                  d: "Đội ngũ kỹ thuật khảo sát thực địa, lập báo cáo chi tiết và đề xuất giải pháp tối ưu phù hợp với điều kiện thực tế của công trình.",
                },
                {
                  n: "03",
                  t: "Thiết Kế",
                  d: "Lựa chọn vật liệu từ bộ sưu tập đa dạng, tự do điều chỉnh kích thước và hình dạng để tạo nên hồ bơi độc đáo theo phong cách riêng.",
                },
                {
                  n: "04",
                  t: "Thi Công",
                  d: "Lập kế hoạch và dự toán chi tiết từng hạng mục. Đội thi công chuyên nghiệp đảm bảo tiêu chuẩn kỹ thuật, an toàn và tiến độ cam kết.",
                },
                {
                  n: "05",
                  t: "Bàn Giao",
                  d: "Kiểm tra toàn diện trước bàn giao, hướng dẫn vận hành và bảo trì. Chính sách bảo hành rõ ràng và hỗ trợ lâu dài sau khi sử dụng.",
                },
              ].map((p, idx) => (
                <div
                  key={p.n}
                  className="flex flex-col"
                  style={{ paddingTop: idx % 2 === 1 ? 40 : 0 }}
                >
                  <span
                    className="font-thin"
                    style={{
                      fontSize: "3.5rem",
                      color: "rgba(255,255,255,0.08)",
                      lineHeight: 1,
                      marginBottom: 24,
                    }}
                  >
                    {p.n}
                  </span>
                  <div
                    style={{
                      width: 24,
                      height: 1,
                      background: "rgba(255,255,255,0.2)",
                      marginBottom: 20,
                    }}
                  />
                  <h3
                    className="text-white font-light"
                    style={{
                      fontSize: "0.9rem",
                      letterSpacing: "0.06em",
                      marginBottom: 14,
                    }}
                  >
                    {p.t}
                  </h3>
                  <p
                    className="text-sm leading-7"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    {p.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CONTACT ─── */}
        <section
          ref={ref(4)}
          id="lien-he"
          className="relative h-screen w-full flex items-center justify-center overflow-hidden"
          style={{
            scrollSnapAlign: "start",
            backgroundImage: "url('/photos/tilebg.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <WaterCanvas />

          <div
            className="contact-outer relative z-10"
            style={{ width: "100%", maxWidth: 960, padding: "0 56px" }}
          >
            <div
              className="contact-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.4fr",
                gap: 80,
                alignItems: "center",
                background: "rgba(256, 256, 256, 0.00)",
                backdropFilter: "blur(4px)",
                padding: "56px 64px",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Left — info */}
              <div>
                <Label left>Liên Hệ</Label>
                <h2
                  className="text-white font-light contact-title"
                  style={{
                    fontSize: "2.8rem",
                    letterSpacing: "0.01em",
                    margin: "20px 0 24px",
                    lineHeight: 1.15,
                  }}
                >
                  Bắt Đầu
                  <br />
                  Dự Án Của Bạn
                </h2>
                <p
                  className="text-sm leading-7"
                  style={{ color: "rgba(255,255,255,0.65)", marginBottom: 48 }}
                >
                  Hãy để chúng tôi biến ý tưởng của bạn thành hiện thực. Liên hệ
                  để được tư vấn miễn phí.
                </p>
                <div className="flex flex-col gap-5">
                  {[
                    {
                      label: "Email",
                      value: "info@linhlinhdan.com",
                      href: "mailto:info@linhlinhdan.com",
                      tip: "Gửi email",
                      icon: (
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <polyline points="2,4 12,13 22,4" />
                        </svg>
                      ),
                    },
                    {
                      label: "Điện Thoại",
                      value: "+84 919 992 424",
                      href: "tel:+84919992424",
                      tip: "Gọi ngay",
                      icon: (
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 5.61 5.61l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      ),
                    },
                    {
                      label: "Địa Chỉ",
                      value: "49L Quốc Hương, Thảo Điền, An Khánh, Hồ Chí Minh",
                      href: "https://maps.app.goo.gl/fkEcdE9EKqoS3T5Q9",
                      tip: "Xem bản đồ",
                      icon: (
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                          <circle cx="12" cy="9" r="2.5" />
                        </svg>
                      ),
                    },
                  ].map((c) => (
                    <div key={c.label} className="relative group/item">
                      <p
                        className="text-[10px] tracking-[0.4em] uppercase mb-1"
                        style={{ color: "rgba(255,255,255,0.45)" }}
                      >
                        {c.label}
                      </p>
                      <a
                        href={c.href}
                        target={c.label === "Địa Chỉ" ? "_blank" : undefined}
                        rel={
                          c.label === "Địa Chỉ"
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="text-sm font-light transition-colors duration-200"
                        style={{ color: "rgba(255,255,255,0.9)" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#60A5FA")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color =
                            "rgba(255,255,255,0.9)")
                        }
                      >
                        {c.value}
                      </a>
                      {/* Bubble tooltip */}
                      <div
                        className="pointer-events-none absolute left-0 bottom-full mb-2 opacity-0 group-hover/item:opacity-100 transition-all duration-200 translate-y-1 group-hover/item:translate-y-0"
                        style={{ whiteSpace: "nowrap", zIndex: 10 }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            background: "white",
                            color: "#000",
                            fontSize: "0.65rem",
                            fontWeight: 500,
                            letterSpacing: "0.08em",
                            padding: "5px 10px",
                            borderRadius: 99,
                          }}
                        >
                          {c.icon}
                          {c.tip}
                        </div>
                        <div
                          style={{
                            width: 6,
                            height: 6,
                            background: "white",
                            transform: "rotate(45deg)",
                            margin: "-3px 14px 0",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — form */}
              <form className="flex flex-col gap-0">
                {[
                  { type: "text", placeholder: "Họ & Tên", half: true },
                  { type: "tel", placeholder: "Số Điện Thoại", half: true },
                  { type: "email", placeholder: "Email", half: false },
                ].reduce<React.ReactNode[]>((acc, field, idx, arr) => {
                  if (field.half && arr[idx - 1]?.half && idx % 2 === 1)
                    return acc;
                  if (field.half && arr[idx + 1]?.half) {
                    acc.push(
                      <div
                        key={idx}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 24,
                        }}
                      >
                        <UnderlineInput
                          type={field.type}
                          placeholder={field.placeholder}
                        />
                        <UnderlineInput
                          type={arr[idx + 1].type}
                          placeholder={arr[idx + 1].placeholder}
                        />
                      </div>
                    );
                  } else {
                    acc.push(
                      <UnderlineInput
                        key={idx}
                        type={field.type}
                        placeholder={field.placeholder}
                      />
                    );
                  }
                  return acc;
                }, [])}

                <div style={{ marginTop: 0 }}>
                  <textarea
                    rows={3}
                    placeholder="Mô tả dự án của bạn..."
                    className="w-full bg-transparent text-white text-sm placeholder-white/40 focus:outline-none resize-none leading-7"
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.25)",
                      padding: "16px 0",
                      transition: "border-color 0.2s",
                      display: "block",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderBottomColor =
                        "rgba(255,255,255,0.7)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderBottomColor =
                        "rgba(255,255,255,0.25)")
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="text-xs tracking-[0.35em] uppercase transition-all duration-300 hover:bg-white/20 hover:text-black"
                  style={{
                    marginTop: 36,
                    padding: "16px 0",
                    border: "1px solid rgba(255,255,255,0.25)",
                    color: "white",
                    letterSpacing: "0.3em",
                  }}
                >
                  Gửi Yêu Cầu
                </button>

                <p
                  className="text-center text-xs tracking-widest"
                  style={{ color: "rgba(255,255,255,0.18)", marginTop: 32 }}
                >
                  © {new Date().getFullYear()} Saigon Pool. All rights reserved.
                </p>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function UnderlineInput({
  type,
  placeholder,
}: {
  type: string;
  placeholder: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full bg-transparent text-white text-sm focus:outline-none placeholder-white/40"
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.25)",
        padding: "16px 0",
        color: "white",
        transition: "border-color 0.2s",
      }}
      onFocus={(e) =>
        (e.target.style.borderBottomColor = "rgba(255,255,255,0.7)")
      }
      onBlur={(e) =>
        (e.target.style.borderBottomColor = "rgba(255,255,255,0.25)")
      }
    />
  );
}

const e = (s: string) => "/" + s.split("/").map(encodeURIComponent).join("/");
type Project = { name: string; photos: string[] };

const PROJECTS: Project[] = [
  { name: "An Nam Resort", photos: [e("photos/CT/AN NAM RESORT/main.jpg"), e("photos/CT/AN NAM RESORT/1.jpg"), e("photos/CT/AN NAM RESORT/2.jpg")] },
  { name: "Anh Long – Thuận An", photos: [e("photos/CT/ANH LONG - THUẬN AN BD/main.jpg"), e("photos/CT/ANH LONG - THUẬN AN BD/z6001798243652_440afff9f7298dec50d42c1651206142.jpg"), e("photos/CT/ANH LONG - THUẬN AN BD/z6001798254175_bfd31685ac7f56c09ccdc141f3da91c8.jpg")] },
  { name: "CT Anh Tâm – Thủ Dầu Một", photos: [e("photos/CT/CT ANH TÂM - THỦ DẦU MỘT/main.jpg"), e("photos/CT/CT ANH TÂM - THỦ DẦU MỘT/145250236_1053152928499636_8983928726142175707_n.jpg"), e("photos/CT/CT ANH TÂM - THỦ DẦU MỘT/145349759_1053152825166313_4622665047202296211_n.jpg"), e("photos/CT/CT ANH TÂM - THỦ DẦU MỘT/147278058_1053152898499639_8388114328228546847_n.jpg")] },
  { name: "CT Anh Vũ – Lâm Đồng", photos: [e("photos/CT/CT ANH VŨ - LÂM ĐỒNG/main.png"), e("photos/CT/CT ANH VŨ - LÂM ĐỒNG/10.png"), e("photos/CT/CT ANH VŨ - LÂM ĐỒNG/11.png")] },
  { name: "CT Chị Thùy – Lái Thiêu", photos: [e("photos/CT/CT CHỊ THÙY LÁI THIÊU/main.png"), e("photos/CT/CT CHỊ THÙY LÁI THIÊU/12.png"), e("photos/CT/CT CHỊ THÙY LÁI THIÊU/15.png"), e("photos/CT/CT CHỊ THÙY LÁI THIÊU/16.png"), e("photos/CT/CT CHỊ THÙY LÁI THIÊU/z7689856165383_513f500d02a2a7aa9d33f4c514b8af35.jpg"), e("photos/CT/CT CHỊ THÙY LÁI THIÊU/z7689856173029_20709352d349bef57cb6a029cd27d188.jpg"), e("photos/CT/CT CHỊ THÙY LÁI THIÊU/z7689856183017_bf69ca1c3be73bd6a97f4fff1cf96b52.jpg"), e("photos/CT/CT CHỊ THÙY LÁI THIÊU/z7689856183659_7ae647e1e5fb0fa184748e3823c1e59c.jpg")] },
  { name: "CT Nhơn Trạch", photos: [e("photos/CT/CT NHƠN TRẠCH/main.jpg"), e("photos/CT/CT NHƠN TRẠCH/483883220_987190993398459_8261432256101663277_n.jpg"), e("photos/CT/CT NHƠN TRẠCH/484130688_987191143398444_3075465510373178487_n.jpg"), e("photos/CT/CT NHƠN TRẠCH/z7725246697799_cc30d5a2c6276bd6656c16e3271530a9.jpg"), e("photos/CT/CT NHƠN TRẠCH/z7725246708153_832ab4d11125f85be3a56fa1ecf7ad69.jpg"), e("photos/CT/CT NHƠN TRẠCH/z7725246710305_23f2f6cd89ed0318e1bc7a7bc51bf536.jpg"), e("photos/CT/CT NHƠN TRẠCH/z7725246717978_199858a6636cc7087b54fd834f3ffd80.jpg"), e("photos/CT/CT NHƠN TRẠCH/z7725246721021_b6173593d1af6694f7cd93ba0f85720e.jpg"), e("photos/CT/CT NHƠN TRẠCH/z7725246730244_c053bddec9750897f57c040843e7bc4f.jpg"), e("photos/CT/CT NHƠN TRẠCH/z7725246734426_c543b1b5c724fdb5814163cb96ba5d08.jpg"), e("photos/CT/CT NHƠN TRẠCH/z7725246737487_80cd755ae1c30103c7b0708fb9fdea08.jpg")] },
  { name: "CT Trường Bùi Thị Xuân – Đồng Nai", photos: [e("photos/CT/CT TRƯỜNG BÙI THỊ XUÂN - ĐỒNG NAI/main.jpg"), e("photos/CT/CT TRƯỜNG BÙI THỊ XUÂN - ĐỒNG NAI/z7666947551801_80c6b1908e7de04eb9a9e18a68ee4d8f.jpg"), e("photos/CT/CT TRƯỜNG BÙI THỊ XUÂN - ĐỒNG NAI/z7666947585115_2d130f7ce1d2f01124b8762da2a4fcbd.jpg"), e("photos/CT/CT TRƯỜNG BÙI THỊ XUÂN - ĐỒNG NAI/z7666947585116_3f700f005f684737a08fa0a30bc69bb0.jpg"), e("photos/CT/CT TRƯỜNG BÙI THỊ XUÂN - ĐỒNG NAI/z7666947585118_4f0ff5a82b804f48239dcd32e7cc53c2.jpg"), e("photos/CT/CT TRƯỜNG BÙI THỊ XUÂN - ĐỒNG NAI/z7666947585119_1d070ccf20973ba99222eb9b9ff4c238.jpg"), e("photos/CT/CT TRƯỜNG BÙI THỊ XUÂN - ĐỒNG NAI/z7666947585120_ab3fdc6fbcbdc3abb43ea429de213294.jpg"), e("photos/CT/CT TRƯỜNG BÙI THỊ XUÂN - ĐỒNG NAI/z7666947585121_88e4041229ba34dd7e613c559516385b.jpg")] },
  { name: "Gò Công – Tiền Giang", photos: [e("photos/CT/GÒ CÔNG - TIỀN GIANG/main.jpg"), e("photos/CT/GÒ CÔNG - TIỀN GIANG/z6001786159387_a292c79e8f6733ac14a404ff19eeb768.jpg"), e("photos/CT/GÒ CÔNG - TIỀN GIANG/z6001786997366_e2fdd18d3cdf708677b58f401f1e2335.jpg")] },
  { name: "La Maison de Campagne", photos: [e("photos/CT/LA MAISON DE CAMPAGNE/main.jpg"), e("photos/CT/LA MAISON DE CAMPAGNE/33137410_1076375375861228_866307702605742080_n.jpg"), e("photos/CT/LA MAISON DE CAMPAGNE/37245640_1129460703886028_1887678499284582400_n.jpg"), e("photos/CT/LA MAISON DE CAMPAGNE/462228930_3105691639596248_265259701098415019_n.jpg")] },
  { name: "Nguyễn Ư Dĩ", photos: [e("photos/CT/NGUYỄN Ư DĨ/main.jpg"), e("photos/CT/NGUYỄN Ư DĨ/524618688_1087321356718755_3465773905738856592_n.jpg"), e("photos/CT/NGUYỄN Ư DĨ/525601403_1087321360052088_3341107866079582956_n.jpg"), e("photos/CT/NGUYỄN Ư DĨ/525792076_1087322676718623_1918399872725374111_n.jpg"), e("photos/CT/NGUYỄN Ư DĨ/z7725933735801_0eeb4446de457dd3be12a3b5ab953217.jpg"), e("photos/CT/NGUYỄN Ư DĨ/z7725933758168_196ba717dab9e2e1b898f3b4edd18448.jpg"), e("photos/CT/NGUYỄN Ư DĨ/z7725933774605_33e287f71d7e4523db9e5f5131ec9817.jpg"), e("photos/CT/NGUYỄN Ư DĨ/z7725933798873_c671a073aa4d7abe752efb16fc03c454.jpg"), e("photos/CT/NGUYỄN Ư DĨ/z7725933823113_a7517ba02565e145c051a86e153ff208.jpg"), e("photos/CT/NGUYỄN Ư DĨ/z7725933836646_7ffb7b8867c50d12ab2476a5e45b2efc.jpg"), e("photos/CT/NGUYỄN Ư DĨ/z7725933849450_91841a370beeecea5ede97ee1a42dc25.jpg"), e("photos/CT/NGUYỄN Ư DĨ/z7725933874627_0241b5c0c4e82907f5ecf09ee411a839.jpg"), e("photos/CT/NGUYỄN Ư DĨ/z7725933905478_9a6628605282104b65922b6be841cebe.jpg"), e("photos/CT/NGUYỄN Ư DĨ/z7725933939374_336dfd5ac2b492b2cc0b708e186e0b8a.jpg"), e("photos/CT/NGUYỄN Ư DĨ/z7725933971056_ec9be5da8eafa454ae1970b9dad2b0db.jpg"), e("photos/CT/NGUYỄN Ư DĨ/z7725934001843_a5e57df8757a25db64f70c6bc4f0d244.jpg")] },
  { name: "Phòng Sauna 1", photos: [e("photos/CT/PHÒNG SAUNA 1/298754826_1410753066072952_158666123998050449_n.jpg"), e("photos/CT/PHÒNG SAUNA 1/298799770_1410753092739616_3641453143522959281_n.jpg"), e("photos/CT/PHÒNG SAUNA 1/299071314_1410753156072943_9023091062281397649_n.jpg"), e("photos/CT/PHÒNG SAUNA 1/299101914_1410753812739544_7037121145382090201_n.jpg"), e("photos/CT/PHÒNG SAUNA 1/299112273_1410753212739604_7758280801581717013_n.jpg")] },
  { name: "Phòng Sauna 2", photos: [e("photos/CT/PHÒNG SAUNA 2/158291248_1074429726371956_6726411855873353599_n.jpg"), e("photos/CT/PHÒNG SAUNA 2/158445487_1074429849705277_2070508328466625463_n.jpg"), e("photos/CT/PHÒNG SAUNA 2/158618802_1074429823038613_4521882971511355926_n.jpg"), e("photos/CT/PHÒNG SAUNA 2/158828456_1074429746371954_5827632627542097321_n.jpg"), e("photos/CT/PHÒNG SAUNA 2/159461066_1074429803038615_6445194594242345609_n.jpg"), e("photos/CT/PHÒNG SAUNA 2/159479031_1074429783038617_8770533814173793204_n.jpg")] },
  { name: "Phòng Sauna Thảo Điền", photos: [e("photos/CT/PHÒNG SAUNA THẢO ĐIỀN/z7648668219673_56f0fd836e9f143e0fc4ba861d2b785f.jpg"), e("photos/CT/PHÒNG SAUNA THẢO ĐIỀN/z7648668239998_411e701cbddbb0019e492d8e73cdeaa1.jpg"), e("photos/CT/PHÒNG SAUNA THẢO ĐIỀN/z7648668240002_8e81089538798d73ce4bcf9363c61b76.jpg"), e("photos/CT/PHÒNG SAUNA THẢO ĐIỀN/z7648668240003_e260eced0b2713c2ae841581042c6abc.jpg"), e("photos/CT/PHÒNG SAUNA THẢO ĐIỀN/z7648668258641_9bce953c3ebf0c21757a72f153857b5e.jpg"), e("photos/CT/PHÒNG SAUNA THẢO ĐIỀN/z7648668258889_50921869379d306ae0e155d6784dafa4.jpg")] },
  { name: "Private Resident – Bình Dương", photos: [e("photos/CT/PRIVATE RESIDENT ( BINH DUONG )/main.jpg"), e("photos/CT/PRIVATE RESIDENT ( BINH DUONG )/270255094_1267387043742889_2129287397831394921_n.jpg"), e("photos/CT/PRIVATE RESIDENT ( BINH DUONG )/270382514_145064381219070_8025224364206930678_n.jpg"), e("photos/CT/PRIVATE RESIDENT ( BINH DUONG )/271655196_145064431219065_7438285800042806881_n.jpg"), e("photos/CT/PRIVATE RESIDENT ( BINH DUONG )/271748119_145064367885738_6747422466468919539_n.jpg"), e("photos/CT/PRIVATE RESIDENT ( BINH DUONG )/271885352_145064294552412_854493187644353716_n.jpg"), e("photos/CT/PRIVATE RESIDENT ( BINH DUONG )/271891853_145064277885747_6122016480736024317_n.jpg")] },
  { name: "Singapore International School", photos: [e("photos/CT/SINGAPORE INTERNATITIONAL SCHOOL/main.jpg"), e("photos/CT/SINGAPORE INTERNATITIONAL SCHOOL/273887113_150859223972919_178405544567450680_n.jpg"), e("photos/CT/SINGAPORE INTERNATITIONAL SCHOOL/274031266_150859233972918_6702729223654071584_n.jpg")] },
  { name: "Thuận An – Bình Dương", photos: [e("photos/CT/THUẬN AN - BD/main.jpg"), e("photos/CT/THUẬN AN - BD/115765989_915588362256094_2551826720722931032_n.jpg"), e("photos/CT/THUẬN AN - BD/116209459_915588278922769_1699565155035210381_n.jpg"), e("photos/CT/THUẬN AN - BD/116253019_915588478922749_4710923537349340389_n.jpg"), e("photos/CT/THUẬN AN - BD/116329363_915588272256103_1565437504983425668_n (1).jpg"), e("photos/CT/THUẬN AN - BD/116329363_915588272256103_1565437504983425668_n.jpg"), e("photos/CT/THUẬN AN - BD/116443757_915588445589419_8559847386291417476_n.jpg"), e("photos/CT/THUẬN AN - BD/116455554_915588495589414_7741820830875850095_n.jpg"), e("photos/CT/THUẬN AN - BD/116715470_915588408922756_2961384151389467850_n.jpg")] },
  { name: "Thảo Điền – Q2", photos: [e("photos/CT/THẢO ĐIỀN - Q2/main.jpg"), e("photos/CT/THẢO ĐIỀN - Q2/120277032_961350977679832_9138570838912859010_n.jpg"), e("photos/CT/THẢO ĐIỀN - Q2/120293312_961351134346483_5320060672932495169_n.jpg"), e("photos/CT/THẢO ĐIỀN - Q2/120553060_961351084346488_3860618796638349751_n.jpg")] },
  { name: "Thủ Dầu Một – Bình Dương", photos: [e("photos/CT/THỦ DẦU MỘT - BD/main.jpg"), e("photos/CT/THỦ DẦU MỘT - BD/107829315_905592516589012_3131941180020331065_n.jpg"), e("photos/CT/THỦ DẦU MỘT - BD/109141275_905592576589006_6489856170585189167_n.jpg"), e("photos/CT/THỦ DẦU MỘT - BD/109175005_905592459922351_1449249139066561085_n.jpg"), e("photos/CT/THỦ DẦU MỘT - BD/109714159_905592433255687_7937341406033198976_n.jpg"), e("photos/CT/THỦ DẦU MỘT - BD/109833806_905592489922348_1977344106552080312_n.jpg"), e("photos/CT/THỦ DẦU MỘT - BD/110199054_905592546589009_6812740844022215080_n.jpg")] },
  { name: "Tulip 29", photos: [e("photos/CT/TULIP 29/main.jpg"), e("photos/CT/TULIP 29/z7725938458271_ca9fd627260541edc312098bd4f4f6e9.jpg"), e("photos/CT/TULIP 29/z7725938467473_16671209fefbaf3557b2c9302779785f.jpg"), e("photos/CT/TULIP 29/z7725938493114_8a58c9026ee06aa3f68692f719b6d7a9.jpg"), e("photos/CT/TULIP 29/z7725938521132_7fea948c99ae0c178b1b0a8bfc825bd5.jpg"), e("photos/CT/TULIP 29/z7725938538962_5d22ce1e0139506e38145d6b6008bce7.jpg"), e("photos/CT/TULIP 29/z7725938562141_872b8830512ba7772d55739b9c8005c5.jpg"), e("photos/CT/TULIP 29/z7725938578691_deb5c1fc66426c6fa9c3d543bdc883ff.jpg"), e("photos/CT/TULIP 29/z7725938593989_08f7c68f0d28ad8c89d180e46e55e96d.jpg"), e("photos/CT/TULIP 29/z7725941165152_dddd6dd7148b5f400d01c39cc0a13696.jpg"), e("photos/CT/TULIP 29/z7725941180532_a5c8247db0c00ad89233c25ad4aa6a39.jpg"), e("photos/CT/TULIP 29/z7725941194012_c7689feb43dc94bfcd2c6d1270cbd819.jpg"), e("photos/CT/TULIP 29/z7725941206440_e3a5704f6c28b3f936b1553685da0967.jpg")] },
  { name: "Tulip 8", photos: [e("photos/CT/TULIP 8/main.png"), e("photos/CT/TULIP 8/1.png"), e("photos/CT/TULIP 8/2.png"), e("photos/CT/TULIP 8/3.png"), e("photos/CT/TULIP 8/4.png"), e("photos/CT/TULIP 8/5.png"), e("photos/CT/TULIP 8/6.png"), e("photos/CT/TULIP 8/7.png"), e("photos/CT/TULIP 8/8.png"), e("photos/CT/TULIP 8/9.png"), e("photos/CT/TULIP 8/z7725943006140_aca03eb9abde56941db3c0898f1f5ada.jpg"), e("photos/CT/TULIP 8/z7725943030641_fddbf17b2dea3a02f914ac0fd526bdde.jpg")] },
  { name: "Công Trình", photos: [e("photos/CT/3/main.jpg"), e("photos/CT/3/131630368_1023080644840198_6605691566556036943_n.jpg"), e("photos/CT/3/131927723_1023080691506860_2396807352572751001_n.jpg"), e("photos/CT/3/132038978_1023080664840196_6908504946235264019_n.jpg")] },
];

const PROJECT_ROWS = [
  PROJECTS.slice(0, 5),
  PROJECTS.slice(5, 9),
  PROJECTS.slice(9, 13),
  PROJECTS.slice(13, 17),
  PROJECTS.slice(17),
];

function GalleryModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const total = project.photos.length;
  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") onClose();
      if (ev.key === "ArrowRight") next();
      if (ev.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col"
      style={{ background: "rgba(4,4,4,0.97)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between shrink-0"
        style={{ padding: "24px 36px" }}
        onClick={(ev) => ev.stopPropagation()}
      >
        <div>
          <p className="text-white/40 text-[9px] tracking-[0.5em] uppercase mb-1">Dự Án</p>
          <p className="text-white text-sm font-light tracking-widest uppercase">{project.name}</p>
        </div>
        <div className="flex items-center gap-6">
          <p className="text-white/30 text-[10px] tracking-widest">{idx + 1} / {total}</p>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors duration-200 text-lg"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Main image */}
      <div
        className="flex-1 flex items-center justify-center relative min-h-0"
        onClick={(ev) => ev.stopPropagation()}
      >
        <button
          onClick={prev}
          className="absolute left-6 z-10 text-white/40 hover:text-white transition-colors duration-200 text-2xl px-4 py-8"
        >
          ‹
        </button>
        <img
          key={project.photos[idx]}
          src={project.photos[idx]}
          alt={project.name}
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
        />
        <button
          onClick={next}
          className="absolute right-6 z-10 text-white/40 hover:text-white transition-colors duration-200 text-2xl px-4 py-8"
        >
          ›
        </button>
      </div>

      {/* Thumbnails */}
      <div
        className="shrink-0 flex gap-2 overflow-x-auto"
        style={{ padding: "16px 36px 24px" }}
        onClick={(ev) => ev.stopPropagation()}
      >
        {project.photos.map((src, i) => (
          <button
            key={src}
            onClick={() => setIdx(i)}
            style={{
              flex: "0 0 72px",
              height: 48,
              opacity: i === idx ? 1 : 0.35,
              transition: "opacity 0.2s",
              overflow: "hidden",
              border: i === idx ? "1px solid rgba(255,255,255,0.5)" : "1px solid transparent",
            }}
          >
            <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </button>
        ))}
      </div>
    </div>
  );
}

function ExpandingGrid() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: "0 56px" }}>
        {PROJECT_ROWS.map((row, ri) => (
          <div key={ri} style={{ display: "flex", gap: 4, alignItems: "flex-end" }}>
            {row.map((project) => (
              <div
                key={project.name}
                className="group/photo relative overflow-hidden"
                style={{
                  flex: 1,
                  minWidth: 0,
                  transition: "flex 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                }}
                onMouseEnter={(ev) => { (ev.currentTarget as HTMLDivElement).style.flex = "3"; }}
                onMouseLeave={(ev) => { (ev.currentTarget as HTMLDivElement).style.flex = "1"; }}
                onClick={() => setActiveProject(project)}
              >
                <img
                  src={project.photos[0]}
                  alt={project.name}
                  style={{ width: "100%", height: "auto", display: "block", transition: "transform 0.5s ease" }}
                  className="group-hover/photo:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/photo:bg-black/25 transition-all duration-400" />
                <div
                  className="absolute bottom-0 left-0 right-0 flex items-end justify-between opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300"
                  style={{ padding: "28px 14px 12px", background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)" }}
                >
                  <p className="text-white text-[9px] tracking-widest uppercase">{project.name}</p>
                  <p className="text-white/60 text-[9px] tracking-widest uppercase">See More</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {activeProject && <GalleryModal project={activeProject} onClose={() => setActiveProject(null)} />}
    </>
  );
}

function Label({
  children,
  left,
}: {
  children: React.ReactNode;
  left?: boolean;
}) {
  return (
    <div className={`flex items-center gap-4 ${left ? "" : "justify-center"}`}>
      <div
        style={{ width: 20, height: 1, background: "rgba(255,255,255,0.28)" }}
      />
      <span
        className="text-[10px] tracking-[0.5em] uppercase"
        style={{ color: "rgba(255,255,255,0.32)" }}
      >
        {children}
      </span>
      {!left && (
        <div
          style={{ width: 20, height: 1, background: "rgba(255,255,255,0.28)" }}
        />
      )}
    </div>
  );
}
