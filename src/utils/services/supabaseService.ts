
// This file now serves as a barrel export file to maintain backward compatibility

import { ImportedVehicle } from '../types/vehicle';
import { Tag } from '../types/tag';

// Re-export vehicle-related functions
export {
  fetchVehiclesFromSupabase,
  migrateLocalVehiclesToSupabase,
  addVehicleToSupabase,
  updateVehicleInSupabase,
  deleteVehicleFromSupabase,
  toggleFeaturedStatusInSupabase
} from './vehicleService';

// Re-export testimonial-related functions
export {
  fetchTestimonials,
  addTestimonial,
  approveTestimonial,
  deleteTestimonial
} from './testimonialService';

// Re-export payment-related functions
export {
  fetchPayments,
  addPayment,
  updatePaymentStatus
} from './paymentService';

// Re-export promotion-related functions
export {
  fetchPromotions,
  addPromotion,
  updatePromotion,
  togglePromotionStatus
} from './promotionService';

// Re-export stats-related functions
export {
  fetchDailyStats,
  updateDailyStats
} from './statsService';

// Re-export tag-related functions
export {
  fetchTags,
  addTag,
  fetchVehicleTags,
  addVehicleTag,
  removeVehicleTag
} from './tagService';
