// "use client";

// import { useState, useCallback, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "sonner";
// import { PaymentState } from "@/features/payment/types/payment.types";
// import { BillingFormData, BillingSchema, PaymentFormData, PaymentSchema } from "@/features/payment/schema/payment.schema";

// export function usePayment() {
//   const [state, setState] = useState<PaymentState>({
//     currentStep: 1,
//     billingData: null,
//     paymentData: null,
//     isSubmitting: false,
//   });

//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const billingForm = useForm<BillingFormData>({
//     resolver: zodResolver(BillingSchema),
//     mode: "onBlur",
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       phone: "",
//       address: "",
//       city: "",
//       state: "",
//       zipCode: "",
//       country: "",
//     },
//   });

//   const paymentForm = useForm<PaymentFormData>({
//     resolver: zodResolver(PaymentSchema),
//     mode: "onBlur",
//     defaultValues: {
//       cardNumber: "",
//       cardName: "",
//       expiryDate: "",
//       cvv: "",
//       saveCard: false,
//     },
//   });

//   const goToStep = useCallback((step: 1 | 2 | 3) => {
//     setState((prev) => ({ ...prev, currentStep: step }));
//     if (isClient) {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   }, [isClient]);

//   const handleBillingNext = useCallback(async () => {
//     const result = await billingForm.trigger();
//     if (result) {
//       const data = billingForm.getValues();
      
//       // Validate on server
//       const validation = await validateBillingAction(data);
//       if (!validation.success) {
//         if (validation.errors) {
//           Object.entries(validation.errors).forEach(([field, messages]) => {
//             billingForm.setError(field as keyof BillingFormData, {
//               type: "manual",
//               message: messages.join(", "),
//             });
//           });
//         }
//         toast.error("Please fix the errors before continuing");
//         return;
//       }

//       setState((prev) => ({
//         ...prev,
//         billingData: data,
//         currentStep: 2,
//       }));
//       if (isClient) {
//         window.scrollTo({ top: 0, behavior: "smooth" });
//       }
//     }
//   }, [billingForm, isClient]);

//   const handlePaymentNext = useCallback(async () => {
//     const result = await paymentForm.trigger();
//     if (result) {
//       const data = paymentForm.getValues();
      
//       // Validate on server
//       const validation = await validatePaymentAction(data);
//       if (!validation.success) {
//         if (validation.errors) {
//           Object.entries(validation.errors).forEach(([field, messages]) => {
//             paymentForm.setError(field as keyof PaymentFormData, {
//               type: "manual",
//               message: messages.join(", "),
//             });
//           });
//         }
//         toast.error("Please fix the errors before continuing");
//         return;
//       }

//       setState((prev) => ({
//         ...prev,
//         paymentData: data,
//         currentStep: 3,
//       }));
//       if (isClient) {
//         window.scrollTo({ top: 0, behavior: "smooth" });
//       }
//     }
//   }, [paymentForm, isClient]);

//   const handleBack = useCallback(() => {
//     setState((prev) => {
//       const newStep = Math.max(1, prev.currentStep - 1) as 1 | 2 | 3;
//       if (isClient) {
//         window.scrollTo({ top: 0, behavior: "smooth" });
//       }
//       return { ...prev, currentStep: newStep };
//     });
//   }, [isClient]);

//   const handleSubmit = useCallback(async () => {
//     if (!state.billingData || !state.paymentData) {
//       toast.error("Missing required information");
//       return;
//     }

//     setState((prev) => ({ ...prev, isSubmitting: true }));

//     try {
//       // Process payment using server action
//       const result = await processPaymentAction(
//         state.billingData,
//         state.paymentData
//       );

//       if (result.success) {
//         // Send confirmation email
//         await sendConfirmationEmailAction(
//           state.billingData.email,
//           result.transactionId!
//         );

//         toast.success(result.message);

//         // Reset forms
//         billingForm.reset();
//         paymentForm.reset();
//         setState({
//           currentStep: 1,
//           billingData: null,
//           paymentData: null,
//           isSubmitting: false,
//         });

//         // Redirect or show success page
//         if (isClient) {
//           setTimeout(() => {
//             window.location.href = "/booking/confirmation";
//           }, 1500);
//         }
//       } else {
//         toast.error(result.message);
//         setState((prev) => ({ ...prev, isSubmitting: false }));
//       }
//     } catch (error) {
//       console.error("Payment submission error:", error);
//       toast.error("An unexpected error occurred. Please try again.");
//       setState((prev) => ({ ...prev, isSubmitting: false }));
//     }
//   }, [state.billingData, state.paymentData, billingForm, paymentForm, isClient]);

//   // Reset service state on unmount
//   useEffect(() => {
//     return () => {
//       paymentService.resetProcessingState();
//     };
//   }, []);

//   return {
//     state,
//     billingForm,
//     paymentForm,
//     goToStep,
//     handleBillingNext,
//     handlePaymentNext,
//     handleBack,
//     handleSubmit,
//     isClient,
//   };
// }