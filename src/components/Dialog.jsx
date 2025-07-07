// src/components/Dialog.jsx
import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

const Dialog = ({ 
  isOpen, 
  onClose, 
  title, 
  description, 
  icon: Icon,
  iconBgColor = 'bg-gray-100',
  iconColor = 'text-gray-600',
  primaryAction,
  secondaryAction,
  children,
  maxWidth = 'max-w-sm'
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4" 
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-2xl p-6 ${maxWidth} w-full shadow-xl`} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          {/* Icon */}
          {Icon && (
            <div className={`mx-auto w-12 h-12 ${iconBgColor} rounded-full flex items-center justify-center mb-4`}>
              <Icon className={`h-6 w-6 ${iconColor}`} />
            </div>
          )}

          {/* Title */}
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {title}
            </h3>
          )}

          {/* Description */}
          {description && (
            <p className="text-gray-600 mb-6">
              {description}
            </p>
          )}

          {/* Custom Content */}
          {children && (
            <div className="mb-6">
              {children}
            </div>
          )}

          {/* Action Buttons */}
          {(primaryAction || secondaryAction) && (
            <div className="flex space-x-3">
              {/* Secondary Action (Cancel) */}
              {secondaryAction && (
                <button
                  onClick={secondaryAction.onClick || onClose}
                  className={`flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors ${secondaryAction.className || ''}`}
                >
                  {secondaryAction.label}
                </button>
              )}

              {/* Primary Action */}
              {primaryAction && (
                <button
                  onClick={primaryAction.onClick}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${primaryAction.className || 'bg-yellow-500 text-black hover:bg-yellow-400'}`}
                >
                  {primaryAction.label}
                </button>
              )}
            </div>
          )}

          {/* Close button if no actions provided */}
          {!primaryAction && !secondaryAction && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Dialog;
