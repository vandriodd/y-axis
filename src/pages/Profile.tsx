import { useState, useEffect } from "react";
import type { ProfileData } from "@/lib/types.d";
import { Icon } from "@iconify/react/dist/iconify.js";
import PageLayout from "@/components/page-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAuthContext from "@/hooks/useAuthContext";
import CompanyInformation from "@/components/profile/company-information";
import OrderHistory from "@/components/profile/order-history";
import OrderTracking from "@/components/profile/order-tracking";
import ContactPersons from "@/components/profile/contact-persons";
import ContactDetails from "@/components/profile/contact-details";
import AccountInformation from "@/components/profile/account-information";
import BusinessRegistration from "@/components/profile/business-registration";
import { useSearchParams } from "wouter";

export default function Profile() {
  const { getUserData, saveProfileData } = useAuthContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(() => {
    const tab = searchParams.get("tab");
    return tab ? tab : "profile";
  });

  const [profileData, setProfileData] = useState<ProfileData>({
    tradeName: "",
    typeOfBusiness: "",
    parentCompany: "",
    registeredName: "",
    businessRegistrationNo: "",
    ein: "",
    vatRegistrationNo: "",
    dateOfIncorporation: undefined,
    postalAddress: "",
    shipmentAddress: "",
    portOfShipment: "",
    faxNo: "",
    phoneNo: "",
    firstName: "",
    firstEmail: "",
    secondName: "",
    secondEmail: "",
    username: "",
    password: "",

    accountInformationEditing: false,
    companyInformationEditing: false,
    businessRegistrationEditing: false,
    contactDetailsEditing: false,
    contactPersonsEditing: false,

    isSaving: false,
  });

  useEffect(() => {
    setSearchParams({ tab: activeTab });
  }, [activeTab, setSearchParams]);

  useEffect(() => {
    const tab = searchParams.get("tab");
    setActiveTab(tab ?? "profile");
  }, [searchParams]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserData();
        setProfileData((prev) => ({ ...prev, ...userData }));
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [getUserData]);

  const updateProfile = () => {
    saveProfileData(profileData);
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <PageLayout>
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/home">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/profile" className="text-accent">
                Profile
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-garamond font-bold text-accent">
            My Account
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Logged in as</span>
            <span className="text-sm font-semibold">
              {profileData.username}
            </span>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(v) => {
            setActiveTab(v);
          }}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 mb-8 bg-gray-100">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-white data-[state=active]:text-accent cursor-pointer"
            >
              <Icon icon="mdi:account" className="mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-white data-[state=active]:text-accent cursor-pointer"
            >
              <Icon icon="mdi:shopping-outline" className="mr-2" />
              Order History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <CompanyInformation
              profileData={profileData}
              setProfileData={setProfileData}
              saveProfileData={updateProfile}
            />

            <BusinessRegistration
              profileData={profileData}
              setProfileData={setProfileData}
              saveProfileData={updateProfile}
            />

            <ContactDetails
              profileData={profileData}
              setProfileData={setProfileData}
              saveProfileData={updateProfile}
            />

            <ContactPersons
              profileData={profileData}
              setProfileData={setProfileData}
              saveProfileData={updateProfile}
            />

            <AccountInformation
              profileData={profileData}
              setProfileData={setProfileData}
              saveProfileData={updateProfile}
            />
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <OrderHistory />
            <OrderTracking />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
