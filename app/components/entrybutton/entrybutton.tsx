import { coffeeFont } from "@/app/layout";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ type = "button", loading = false, text }) => {
  return (
    <StyledWrapper>
      <button className="button" type={type} disabled={loading}>
        <div>
          <span>
            <Image
              src="/logo.png"
              alt="logo"
              width={24}
              height={24}
              className="logo"
            />
            {loading ? "در حال پردازش..." : text}
          </span>
        </div>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    --stone-50: #fafaf9;
    --stone-800: #292524;
    --red-500: #ef4444;
    --red-700: #b91c1c;
    --red-100: #AD9999;

    font-size: 1rem;
     font-family: ${coffeeFont.style.fontFamily};
    cursor: pointer;
    position: relative;
    font-weight: bold;
    line-height: 1;
    padding: 1px;
    transform: translate(-4px, -4px);
    outline: 2px solid transparent;
    outline-offset: 5px;
    border-radius: 9999px;
    background-color: var(--stone-800);
    color: var(--red-700);
    transition: transform 150ms ease, box-shadow 150ms ease;
    text-align: center;

    box-shadow:
      0.5px 0.5px 0 0 var(--stone-800),
      1px 1px 0 0 var(--stone-800),
      2px 2px 0 0 var(--stone-800),
      0 0 0 2px var(--stone-50);

    &:hover {
      transform: translate(0, 0);
      box-shadow: 0 0 0 2px var(--stone-50);
    }

    &:active,
    &:focus-visible {
      outline-color: var(--red-700);
    }

    & > div {
      position: relative;
      pointer-events: none;
      background-color: var(--red-100);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 9999px;

      &::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 9999px;
        opacity: 0.4;
        background-image: radial-gradient(
            rgb(255 255 255 / 80%) 20%,
            transparent 20%
          ),
          radial-gradient(rgb(255 255 255 / 100%) 20%, transparent 20%);
        background-position: 0 0, 4px 4px;
        background-size: 8px 8px;
        animation: dots 0.5s infinite linear;
      }

      & > span {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.75rem 1.5rem;
        gap: 0.5rem;
        color: black;
        filter: drop-shadow(0 -1px 0 rgba(255, 255, 255, 0.25));

        &:active {
          transform: translateY(2px);
        }
      }

      .logo {
        width: 24px;
        height: 24px;
        object-fit: cover;
        padding: 2px;
      }
    }
  }

  @keyframes dots {
    0% {
      background-position: 0 0, 4px 4px;
    }
    100% {
      background-position: 8px 0, 12px 4px;
    }
  }
`;

export default Button;
