'use client'
import React from "react";
import { 
  Button, Card, CardBody, Input, Switch, Tooltip, Divider, Tabs, Tab, 
  Select, SelectItem, Badge, Checkbox, Progress, Dropdown, DropdownTrigger, 
  DropdownMenu, DropdownItem, Table, TableHeader, TableColumn, TableBody, 
  TableRow, TableCell, Pagination
} from "@heroui/react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export const SettingsPage: React.FC<{ navigateTo: (view: string) => void }> = ({ navigateTo }) => {
  const [activeTab, setActiveTab] = React.useState("general");
  
  // General Settings state
  const [language, setLanguage] = React.useState("en-US");
  const [dateFormat, setDateFormat] = React.useState("MM/DD/YYYY");
  const [currency, setCurrency] = React.useState("USD");
  const [defaultProject, setDefaultProject] = React.useState("all");
  
  // Team Management state
  const [teamMembers, setTeamMembers] = React.useState([
    { id: 1, name: "John Contractor", email: "john@acmeconstruction.com", role: "Admin", status: "Active" },
    { id: 2, name: "Sarah Johnson", email: "sarah@acmeconstruction.com", role: "Admin", status: "Active" },
    { id: 3, name: "Mike Builder", email: "mike@acmeconstruction.com", role: "Member", status: "Active" },
    { id: 4, name: "Emily Architect", email: "emily@acmeconstruction.com", role: "Member", status: "Pending" }
  ]);
  const [newMemberName, setNewMemberName] = React.useState("");
  const [newMemberEmail, setNewMemberEmail] = React.useState("");
  const [newMemberRole, setNewMemberRole] = React.useState("Member");
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 3;
  
  // Integrations state
  const [integrations, setIntegrations] = React.useState([
    { id: "quickbooks", name: "QuickBooks", connected: true, icon: "logos:quickbooks" },
    { id: "xero", name: "Xero", connected: false, icon: "logos:xero" },
    { id: "procore", name: "Procore", connected: true, icon: "logos:google-icon" },
    { id: "plangrid", name: "PlanGrid", connected: false, icon: "logos:microsoft-icon" },
    { id: "buildertrend", name: "Buildertrend", connected: false, icon: "logos:slack" }
  ]);
  
  // Document Templates state
  const [templates, setTemplates] = React.useState([
    { id: 1, name: "BuildSupply Inc. Invoice", type: "Invoice", lastUsed: "2 days ago" },
    { id: 2, name: "ConMaterials Receipt", type: "Receipt", lastUsed: "1 week ago" },
    { id: 3, name: "Subcontractor Agreement", type: "Contract", lastUsed: "2 weeks ago" },
    { id: 4, name: "City Permit Application", type: "Permit", lastUsed: "1 month ago" }
  ]);
  
  // Categories & Tax Rules state
  const [categories, setCategories] = React.useState([
    { id: 1, name: "Materials", taxDeductible: true, percentage: 100 },
    { id: 2, name: "Labor", taxDeductible: true, percentage: 100 },
    { id: 3, name: "Equipment Rental", taxDeductible: true, percentage: 100 },
    { id: 4, name: "Office Supplies", taxDeductible: true, percentage: 50 },
    { id: 5, name: "Meals & Entertainment", taxDeductible: true, percentage: 50 }
  ]);
  const [newCategoryName, setNewCategoryName] = React.useState("");
  const [newCategoryDeductible, setNewCategoryDeductible] = React.useState(true);
  const [newCategoryPercentage, setNewCategoryPercentage] = React.useState(100);
  
  // Notifications state
  const [emailNotifications, setEmailNotifications] = React.useState({
    documentProcessed: true,
    newTeamMember: true,
    weeklyReport: true,
    billingUpdates: true
  });
  const [inAppNotifications, setInAppNotifications] = React.useState({
    documentProcessed: true,
    newTeamMember: true,
    weeklyReport: false,
    billingUpdates: true
  });
  const [alertThreshold, setAlertThreshold] = React.useState(5);
  
  // Billing & Subscription state
  const [currentPlan, setCurrentPlan] = React.useState("Professional");
  const [billingCycle, setBillingCycle] = React.useState("monthly");
  const [paymentMethod, setPaymentMethod] = React.useState({
    type: "credit_card",
    last4: "4242",
    expiry: "05/25"
  });
  
  const plans = [
    {
      name: "Starter",
      price: billingCycle === "monthly" ? "$49" : "$470",
      description: "Perfect for small teams and simple projects",
      features: [
        "Process up to 100 documents/month",
        "Basic data extraction",
        "Email support",
        "1 user license"
      ],
      current: currentPlan === "Starter"
    },
    {
      name: "Professional",
      price: billingCycle === "monthly" ? "$149" : "$1,430",
      description: "For growing teams with advanced needs",
      features: [
        "Process up to 500 documents/month",
        "Advanced data extraction & insights",
        "Priority support",
        "5 user licenses",
        "API access"
      ],
      current: currentPlan === "Professional"
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations with complex requirements",
      features: [
        "Unlimited document processing",
        "Custom AI model training",
        "Dedicated account manager",
        "Unlimited users",
        "Advanced security features"
      ],
      current: currentPlan === "Enterprise"
    }
  ];
  
  const billingHistory = [
    { id: "INV-001", date: "Jul 1, 2023", amount: "$149.00", status: "Paid" },
    { id: "INV-002", date: "Jun 1, 2023", amount: "$149.00", status: "Paid" },
    { id: "INV-003", date: "May 1, 2023", amount: "$149.00", status: "Paid" },
    { id: "INV-004", date: "Apr 1, 2023", amount: "$149.00", status: "Paid" }
  ];
  
  const toggleIntegration = (id: string) => {
    setIntegrations(integrations.map(integration => 
      integration.id === id ? { ...integration, connected: !integration.connected } : integration
    ));
  };
  
  const addTeamMember = () => {
    if (newMemberName && newMemberEmail) {
      const newMember = {
        id: teamMembers.length + 1,
        name: newMemberName,
        email: newMemberEmail,
        role: newMemberRole,
        status: "Pending"
      };
      setTeamMembers([...teamMembers, newMember]);
      setNewMemberName("");
      setNewMemberEmail("");
      setNewMemberRole("Member");
    }
  };
  
  const addCategory = () => {
    if (newCategoryName) {
      const newCategory = {
        id: categories.length + 1,
        name: newCategoryName,
        taxDeductible: newCategoryDeductible,
        percentage: newCategoryPercentage
      };
      setCategories([...categories, newCategory]);
      setNewCategoryName("");
      setNewCategoryDeductible(true);
      setNewCategoryPercentage(100);
    }
  };
  
  const handleToggleEmailNotification = (key: keyof typeof emailNotifications) => {
    setEmailNotifications({
      ...emailNotifications,
      [key]: !emailNotifications[key]
    });
  };
  
  const handleToggleInAppNotification = (key: keyof typeof inAppNotifications) => {
    setInAppNotifications({
      ...inAppNotifications,
      [key]: !inAppNotifications[key]
    });
  };
  
  const renderSidebar = () => (
    <div className="w-64 bg-white border-r border-foreground-200 h-full fixed left-0 top-16 overflow-y-auto hidden md:block">
      <div className="p-4">
        <h2 className="font-gilroy text-lg font-bold mb-4">Settings</h2>
        <nav>
          <ul className="space-y-1">
            {[
              { id: "general", label: "General Settings", icon: "lucide:settings" },
              { id: "team", label: "Team Management", icon: "lucide:users" },
              { id: "integrations", label: "Integrations", icon: "lucide:plug" },
              { id: "templates", label: "Document Templates", icon: "lucide:file-text" },
              { id: "categories", label: "Categories & Tax Rules", icon: "lucide:tag" },
              { id: "notifications", label: "Notifications", icon: "lucide:bell" },
              { id: "billing", label: "Billing & Subscription", icon: "lucide:credit-card" }
            ].map((item) => (
              <li key={item.id}>
                <button
                  className={`w-full flex items-center px-3 py-2 rounded-md text-left transition-colors ${
                    activeTab === item.id 
                      ? "bg-primary-50 text-primary-600" 
                      : "hover:bg-foreground-100"
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon icon={item.icon} className="h-5 w-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
  
  const renderMobileNav = () => (
    <div className="md:hidden p-4">
      <Select
        label="Settings Category"
        selectedKeys={[activeTab]}
        onChange={(e) => setActiveTab(e.target.value)}
        className="w-full"
      >
        <SelectItem key="general" value="general">General Settings</SelectItem>
        <SelectItem key="team" value="team">Team Management</SelectItem>
        <SelectItem key="integrations" value="integrations">Integrations</SelectItem>
        <SelectItem key="templates" value="templates">Document Templates</SelectItem>
        <SelectItem key="categories" value="categories">Categories & Tax Rules</SelectItem>
        <SelectItem key="notifications" value="notifications">Notifications</SelectItem>
        <SelectItem key="billing" value="billing">Billing & Subscription</SelectItem>
      </Select>
    </div>
  );
  
  const renderGeneralSettings = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="ambient-shadow mb-8">
        <CardBody className="p-6">
          <h2 className="font-gilroy text-xl font-bold mb-6">General Settings</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-dmsans font-semibold mb-4">Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground-700 mb-2">
                    Language
                  </label>
                  <Select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full"
                  >
                    <SelectItem key="en-US" value="en-US">English (US)</SelectItem>
                    <SelectItem key="en-GB" value="en-GB">English (UK)</SelectItem>
                    <SelectItem key="es" value="es">Spanish</SelectItem>
                    <SelectItem key="fr" value="fr">French</SelectItem>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground-700 mb-2">
                    Date Format
                  </label>
                  <Select
                    value={dateFormat}
                    onChange={(e) => setDateFormat(e.target.value)}
                    className="w-full"
                  >
                    <SelectItem key="MM/DD/YYYY" value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem key="DD/MM/YYYY" value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem key="YYYY-MM-DD" value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground-700 mb-2">
                    Currency
                  </label>
                  <Select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full"
                  >
                    <SelectItem key="USD" value="USD">USD ($)</SelectItem>
                    <SelectItem key="EUR" value="EUR">EUR (€)</SelectItem>
                    <SelectItem key="GBP" value="GBP">GBP (£)</SelectItem>
                    <SelectItem key="CAD" value="CAD">CAD ($)</SelectItem>
                    <SelectItem key="AUD" value="AUD">AUD ($)</SelectItem>
                  </Select>
                </div>
              </div>
            </div>
            
            <Divider />
            
            <div>
              <h3 className="font-dmsans font-semibold mb-4">Default Project Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground-700 mb-2">
                    Default Project View
                  </label>
                  <Select
                    value={defaultProject}
                    onChange={(e) => setDefaultProject(e.target.value)}
                    className="w-full"
                  >
                    <SelectItem key="all" value="all">All Projects</SelectItem>
                    <SelectItem key="recent" value="recent">Recent Projects</SelectItem>
                    <SelectItem key="active" value="active">Active Projects Only</SelectItem>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground-700 mb-2">
                    Default Document Sorting
                  </label>
                  <Select
                    defaultSelectedKeys={["date_desc"]}
                    className="w-full"
                  >
                    <SelectItem key="date_desc" value="date_desc">Date (Newest First)</SelectItem>
                    <SelectItem key="date_asc" value="date_asc">Date (Oldest First)</SelectItem>
                    <SelectItem key="name_asc" value="name_asc">Name (A-Z)</SelectItem>
                    <SelectItem key="name_desc" value="name_desc">Name (Z-A)</SelectItem>
                  </Select>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto-categorize documents</p>
                    <p className="text-sm text-foreground-500">
                      Automatically categorize documents based on AI detection
                    </p>
                  </div>
                  <Switch defaultSelected color="primary" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto-assign to projects</p>
                    <p className="text-sm text-foreground-500">
                      Automatically assign documents to projects based on content
                    </p>
                  </div>
                  <Switch defaultSelected color="primary" />
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
  
  const renderTeamManagement = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="ambient-shadow mb-8">
        <CardBody className="p-6">
          <h2 className="font-gilroy text-xl font-bold mb-6">Team Management</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-dmsans font-semibold mb-4">Team Members</h3>
              
              <Table 
                aria-label="Team members table"
                removeWrapper
                bottomContent={
                  <div className="flex w-full justify-center">
                    <Pagination
                      isCompact
                      showControls
                      showShadow
                      color="primary"
                      page={page}
                      total={Math.ceil(teamMembers.length / rowsPerPage)}
                      onChange={(page) => setPage(page)}
                    />
                  </div>
                }
              >
                <TableHeader>
                  <TableColumn>NAME</TableColumn>
                  <TableColumn>EMAIL</TableColumn>
                  <TableColumn>ROLE</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                  <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                  {teamMembers
                    .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                    .map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-foreground-200 mr-2"></div>
                          <span>{member.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>
                        <Select
                          defaultSelectedKeys={[member.role]}
                          size="sm"
                          className="max-w-[120px]"
                        >
                          <SelectItem key="Admin" value="Admin">Admin</SelectItem>
                          <SelectItem key="Member" value="Member">Member</SelectItem>
                          <SelectItem key="Viewer" value="Viewer">Viewer</SelectItem>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          color={member.status === "Active" ? "success" : "warning"} 
                          variant="flat"
                        >
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            isIconOnly
                            variant="light"
                            size="sm"
                          >
                            <Icon icon="lucide:edit" className="h-4 w-4" />
                          </Button>
                          <Button
                            isIconOnly
                            variant="light"
                            size="sm"
                            color="danger"
                          >
                            <Icon icon="lucide:trash-2" className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <Divider />
            
            <div>
              <h3 className="font-dmsans font-semibold mb-4">Invite New Team Member</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground-700 mb-2">
                    Full Name
                  </label>
                  <Input
                    value={newMemberName}
                    onValueChange={setNewMemberName}
                    placeholder="Enter full name"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    value={newMemberEmail}
                    onValueChange={setNewMemberEmail}
                    placeholder="Enter email address"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground-700 mb-2">
                    Role
                  </label>
                  <Select
                    value={newMemberRole}
                    onChange={(e) => setNewMemberRole(e.target.value)}
                    className="w-full"
                  >
                    <SelectItem key="Admin" value="Admin">Admin</SelectItem>
                    <SelectItem key="Member" value="Member">Member</SelectItem>
                    <SelectItem key="Viewer" value="Viewer">Viewer</SelectItem>
                  </Select>
                </div>
              </div>
              
              <div className="mt-6">
                <Button
                  color="primary"
                  startContent={<Icon icon="lucide:user-plus" className="h-4 w-4" />}
                  onPress={addTeamMember}
                >
                  Send Invitation
                </Button>
              </div>
            </div>
            
            <Divider />
            
            <div>
              <h3 className="font-dmsans font-semibold mb-4">Permission Management</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Allow members to invite others</p>
                    <p className="text-sm text-foreground-500">
                      Team members with "Member" role can invite new users
                    </p>
                  </div>
                  <Switch color="primary" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Allow members to create templates</p>
                    <p className="text-sm text-foreground-500">
                      Team members can create and edit document templates
                    </p>
                  </div>
                  <Switch defaultSelected color="primary" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Allow members to manage integrations</p>
                    <p className="text-sm text-foreground-500">
                      Team members can connect and disconnect integrations
                    </p>
                  </div>
                  <Switch color="primary" />
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
  
  const renderIntegrations = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="ambient-shadow mb-8">
        <CardBody className="p-6">
          <h2 className="font-gilroy text-xl font-bold mb-6">Integrations</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-dmsans font-semibold mb-4">Accounting Software</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {integrations.slice(0, 2).map((integration) => (
                  <div 
                    key={integration.id}
                    className="border border-foreground-200 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="h-12 w-12 flex items-center justify-center mr-4">
                        <Icon icon={integration.icon} className="h-8 w-8" />
                      </div>
                      <div>
                        <p className="font-medium">{integration.name}</p>
                        <p className="text-sm text-foreground-500">
                          {integration.connected ? "Connected" : "Not connected"}
                        </p>
                      </div>
                    </div>
                    <Button
                      color={integration.connected ? "danger" : "primary"}
                      variant={integration.connected ? "flat" : "solid"}
                      onPress={() => toggleIntegration(integration.id)}
                    >
                      {integration.connected ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <Divider />
            
            <div>
              <h3 className="font-dmsans font-semibold mb-4">Project Management Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {integrations.slice(2).map((integration) => (
                  <div 
                    key={integration.id}
                    className="border border-foreground-200 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="h-12 w-12 flex items-center justify-center mr-4">
                        <Icon icon={integration.icon} className="h-8 w-8" />
                      </div>
                      <div>
                        <p className="font-medium">{integration.name}</p>
                        <p className="text-sm text-foreground-500">
                          {integration.connected ? "Connected" : "Not connected"}
                        </p>
                      </div>
                    </div>
                    <Button
                      color={integration.connected ? "danger" : "primary"}
                      variant={integration.connected ? "flat" : "solid"}
                      onPress={() => toggleIntegration(integration.id)}
                    >
                      {integration.connected ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <Divider />
            
            <div>
              <h3 className="font-dmsans font-semibold mb-4">Data Sync Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto-sync with accounting software</p>
                    <p className="text-sm text-foreground-500">
                      Automatically sync processed documents with connected accounting software
                    </p>
                  </div>
                  <Switch defaultSelected color="primary" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Sync frequency</p>
                    <p className="text-sm text-foreground-500">
                      How often to sync data with connected services
                    </p>
                  </div>
                  <Select
                    defaultSelectedKeys={["daily"]}
                    className="max-w-[150px]"
                  >
                    <SelectItem key="realtime" value="realtime">Real-time</SelectItem>
                    <SelectItem key="hourly" value="hourly">Hourly</SelectItem>
                    <SelectItem key="daily" value="daily">Daily</SelectItem>
                    <SelectItem key="weekly" value="weekly">Weekly</SelectItem>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
  
  const renderDocumentTemplates = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="ambient-shadow mb-8">
        <CardBody className="p-6">
          <h2 className="font-gilroy text-xl font-bold mb-6">Document Templates</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-dmsans font-semibold mb-4">Saved Templates</h3>
              <div className="space-y-3">
                {templates.map((template) => (
                  <div 
                    key={template.id}
                    className="border border-foreground-200 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-md bg-primary-50 flex items-center justify-center mr-4">
                        <Icon 
                          icon={
                            template.type === "Invoice" ? "lucide:file-text" : 
                            template.type === "Receipt" ? "lucide:receipt" :
                            template.type === "Contract" ? "lucide:file-signature" :
                            template.type === "Permit" ? "lucide:scale" :
                            "lucide:file-plus"
                          } 
                          className="h-5 w-5 text-primary-500" 
                        />
                      </div>
                      <div>
                        <p className="font-medium">{template.name}</p>
                        <div className="flex items-center text-xs text-foreground-500">
                          <span>{template.type}</span>
                          <span className="mx-2">•</span>
                          <span>Last used {template.lastUsed}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="flat"
                        color="primary"
                        size="sm"
                      >
                        Edit
                      </Button>
                      <Button
                        isIconOnly
                        variant="light"
                        size="sm"
                        color="danger"
                      >
                        <Icon icon="lucide:trash-2" className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4">
                <Button
                  color="primary"
                  variant="flat"
                  startContent={<Icon icon="lucide:plus" className="h-4 w-4" />}
                >
                  Create New Template
                </Button>
              </div>
            </div>
            
            <Divider />
            
            <div>
              <h3 className="font-dmsans font-semibold mb-4">Template Creation</h3>
              <div className="border border-foreground-200 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground-700 mb-2">
                      Template Name
                    </label>
                    <Input
                      placeholder="Enter template name"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground-700 mb-2">
                      Document Type
                    </label>
                    <Select
                      defaultSelectedKeys={["invoice"]}
                      className="w-full"
                    >
                      <SelectItem key="invoice" value="invoice">Invoice</SelectItem>
                      <SelectItem key="receipt" value="receipt">Receipt</SelectItem>
                      <SelectItem key="contract" value="contract">Contract</SelectItem>
                      <SelectItem key="permit" value="permit">Permit</SelectItem>
                      <SelectItem key="change_order" value="change_order">Change Order</SelectItem>
                    </Select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground-700 mb-2">
                    Vendor / Source
                  </label>
                  <Input
                    placeholder="Enter vendor name"
                    className="w-full"
                  />
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-foreground-700 mb-2">Field Mapping</h4>
                  <div className="space-y-3">
                    {["Invoice Number", "Date", "Amount", "Tax", "Description"].map((field, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-1/3">
                          <Input
                            value={field}
                            className="w-full"
                          />
                        </div>
                        <Icon icon="lucide:arrow-right" className="h-4 w-4 text-foreground-400" />
                        <div className="flex-1">
                          <Select
                            defaultSelectedKeys={[field.toLowerCase().replace(" ", "_")]}
                            className="w-full"
                          >
                            <SelectItem key="invoice_number" value="invoice_number">Invoice Number</SelectItem>
                            <SelectItem key="date" value="date">Date</SelectItem>
                            <SelectItem key="amount" value="amount">Amount</SelectItem>
                            <SelectItem key="tax" value="tax">Tax</SelectItem>
                            <SelectItem key="description" value="description">Description</SelectItem>
                            <SelectItem key="vendor" value="vendor">Vendor</SelectItem>
                            <SelectItem key="project" value="project">Project</SelectItem>
                          </Select>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    variant="flat"
                    color="primary"
                    size="sm"
                    startContent={<Icon icon="lucide:plus" className="h-4 w-4" />}
                    className="mt-3"
                  >
                    Add Field
                  </Button>
                </div>
                
                <div className="flex justify-end">
                  <Button
                    color="primary"
                  >
                    Save Template
                  </Button>
                </div>
              </div>
            </div>
            
            <Divider />
            
            <div>
              <h3 className="font-dmsans font-semibold mb-4">Automatic Categorization Rules</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Use AI for automatic categorization</p>
                    <p className="text-sm text-foreground-500">
                      Use machine learning to categorize documents automatically
                    </p>
                  </div>
                  <Switch defaultSelected color="primary" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Confidence threshold</p>
                    <p className="text-sm text-foreground-500">
                      Minimum confidence level for automatic categorization
                    </p>
                  </div>
                  <Select
                    defaultSelectedKeys={["80"]}
                    className="max-w-[150px]"
                  >
                    <SelectItem key="70" value="70">70%</SelectItem>
                    <SelectItem key="80" value="80">80%</SelectItem>
                    <SelectItem key="90" value="90">90%</SelectItem>
                    <SelectItem key="95" value="95">95%</SelectItem>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Require manual review for low confidence</p>
                    <p className="text-sm text-foreground-500">
                      Flag documents with low confidence for manual review
                    </p>
                  </div>
                  <Switch defaultSelected color="primary" />
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
  
  const renderCategoriesAndTaxRules = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="ambient-shadow mb-8">
        <CardBody className="p-6">
          <h2 className="font-gilroy text-xl font-bold mb-6">Categories & Tax Rules</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-dmsans font-semibold mb-4">Expense Categories</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div 
                    key={category.id}
                    className="border border-foreground-200 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-md bg-primary-50 flex items-center justify-center mr-4">
                        <Icon icon="lucide:tag" className="h-5 w-5 text-primary-500" />
                      </div>
                      <div>
                        <p className="font-medium">{category.name}</p>
                        <div className="flex items-center text-xs">
                          {category.taxDeductible ? (
                            <span className="text-success-600 flex items-center">
                              <Icon icon="lucide:check" className="h-3 w-3 mr-1" />
                              Tax Deductible ({category.percentage}%)
                            </span>
                          ) : (
                            <span className="text-danger-600 flex items-center">
                              <Icon icon="lucide:x" className="h-3 w-3 mr-1" />
                              Not Tax Deductible
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="flat"
                        color="primary"
                        size="sm"
                      >
                        Edit
                      </Button>
                      <Button
                        isIconOnly
                        variant="light"
                        size="sm"
                        color="danger"
                      >
                        <Icon icon="lucide:trash-2" className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Divider />
            
            <div>
              <h3 className="font-dmsans font-semibold mb-4">Create New Category</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground-700 mb-2">
                    Category Name
                  </label>
                  <Input
                    value={newCategoryName}
                    onValueChange={setNewCategoryName}
                    placeholder="Enter category name"
                    className="w-full"
                  />
                </div>
                
                <div className="flex items-end">
                  <div className="flex items-center h-[40px]">
                    <Checkbox
                      isSelected={newCategoryDeductible}
                      onValueChange={setNewCategoryDeductible}
                      color="primary"
                    >
                      Tax Deductible
                    </Checkbox>
                  </div>
                </div>
                
                {newCategoryDeductible && (
                  <div>
                    <label className="block text-sm font-medium text-foreground-700 mb-2">
                      Deductible Percentage
                    </label>
                    <Select
                      value={String(newCategoryPercentage)}
                      onChange={(e) => setNewCategoryPercentage(Number(e.target.value))}
                      className="w-full"
                    >
                      <SelectItem key="100" value="100">100%</SelectItem>
                      <SelectItem key="75" value="75">75%</SelectItem>
                      <SelectItem key="50" value="50">50%</SelectItem>
                      <SelectItem key="25" value="25">25%</SelectItem>
                    </Select>
                  </div>
                )}
              </div>
              
              <div className="mt-6">
                <Button
                  color="primary"
                  startContent={<Icon icon="lucide:plus" className="h-4 w-4" />}
                  onPress={addCategory}
                >
                  Add Category
                </Button>
              </div>
            </div>
            
            <Divider />
            
            <div>
              <h3 className="font-dmsans font-semibold mb-4">Construction-Specific Tax Rules</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable construction-specific tax rules</p>
                    <p className="text-sm text-foreground-500">
                      Apply industry-specific tax rules for construction expenses
                    </p>
                  </div>
                  <Switch defaultSelected color="primary" />
                </div>
                
                <div className="border border-foreground-200 rounded-lg p-4">
                  <h4 className="font-medium mb-3">Common Construction Deductions</h4>
                  <div className="space-y-2">
                    {[
                      "Equipment purchases (Section 179)",
                      "Vehicle expenses (mileage or actual)",
                      "Home office deduction",
                      "Insurance premiums",
                      "Contract labor"
                    ].map((rule, index) => (
                      <div key={index} className="flex items-center">
                        <Checkbox defaultSelected color="primary" className="mr-2" />
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border border-foreground-200 rounded-lg p-4">
                  <h4 className="font-medium mb-3">Meals & Entertainment</h4>
                  <p className="text-sm text-foreground-500 mb-3">
                    Construction industry standard for meals & entertainment deductions
                  </p>
                  <Select
                    defaultSelectedKeys={["50"]}
                    className="w-full"
                  >
                    <SelectItem key="50" value="50">50% deductible (standard)</SelectItem>
                    <SelectItem key="100" value="100">100% deductible (special circumstances)</SelectItem>
                    <SelectItem key="0" value="0">Not deductible</SelectItem>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
  
  const renderNotifications = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="ambient-shadow mb-8">
        <CardBody className="p-6">
          <h2 className="font-gilroy text-xl font-bold mb-6">Notifications</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-dmsans font-semibold mb-4">Email Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Document processed</p>
                    <p className="text-sm text-foreground-500">
                      Receive an email when a document is processed
                    </p>
                  </div>
                  <Switch 
                    isSelected={emailNotifications.documentProcessed} 
                    onValueChange={(value) => handleToggleEmailNotification("documentProcessed")}
                    color="primary" 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New team member</p>
                    <p className="text-sm text-foreground-500">
                      Receive an email when a new team member is added
                    </p>
                  </div>
                  <Switch 
                    isSelected={emailNotifications.newTeamMember} 
                    onValueChange={(value) => handleToggleEmailNotification("newTeamMember")}
                    color="primary" 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weekly report</p>
                    <p className="text-sm text-foreground-500">
                      Receive a weekly summary of activity
                    </p>
                  </div>
                  <Switch 
                    isSelected={emailNotifications.weeklyReport} 
                    onValueChange={(value) => handleToggleEmailNotification("weeklyReport")}
                    color="primary" 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Billing updates</p>
                    <p className="text-sm text-foreground-500">
                      Receive emails about billing and subscription changes
                    </p>
                  </div>
                  <Switch 
                    isSelected={emailNotifications.billingUpdates} 
                    onValueChange={(value) => handleToggleEmailNotification("billingUpdates")}
                    color="primary" 
                  />
                </div>
              </div>
            </div>
            
            <Divider />
            
            <div>
              <h3 className="font-dmsans font-semibold mb-4">In-App Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Document processed</p>
                    <p className="text-sm text-foreground-500">
                      Receive a notification when a document is processed
                    </p>
                  </div>
                  <Switch 
                    isSelected={inAppNotifications.documentProcessed} 
                    onValueChange={(value) => handleToggleInAppNotification("documentProcessed")}
                    color="primary" 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New team member</p>
                    <p className="text-sm text-foreground-500">
                      Receive a notification when a new team member is added
                    </p>
                  </div>
                  <Switch 
                    isSelected={inAppNotifications.newTeamMember} 
                    onValueChange={(value) => handleToggleInAppNotification("newTeamMember")}
                    color="primary" 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weekly report</p>
                    <p className="text-sm text-foreground-500">
                      Receive a weekly summary of activity
                    </p>
                  </div>
                  <Switch 
                    isSelected={inAppNotifications.weeklyReport} 
                    onValueChange={(value) => handleToggleInAppNotification("weeklyReport")}
                    color="primary" 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Billing updates</p>
                    <p className="text-sm text-foreground-500">
                      Receive notifications about billing and subscription changes
                    </p>
                  </div>
                  <Switch 
                    isSelected={inAppNotifications.billingUpdates} 
                    onValueChange={(value) => handleToggleInAppNotification("billingUpdates")}
                    color="primary" 
                  />
                </div>
              </div>
            </div>
            
            <Divider />
            
            <div>
              <h3 className="font-dmsans font-semibold mb-4">Document Alert Thresholds</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground-700 mb-2">
                    Alert when documents awaiting review exceeds
                  </label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="number"
                      value={String(alertThreshold)}
                      onValueChange={(value) => setAlertThreshold(Number(value))}
                      className="w-24"
                    />
                    <span>documents</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Alert for high-value documents</p>
                    <p className="text-sm text-foreground-500">
                      Receive alerts for documents with values exceeding thresholds
                    </p>
                  </div>
                  <Switch defaultSelected color="primary" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground-700 mb-2">
                    High-value threshold
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <span className="mr-2">$</span>
                      <Input
                        type="number"
                        defaultValue="5000"
                        className="w-32"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
  
  const renderBillingAndSubscription = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="ambient-shadow mb-8">
        <CardBody className="p-6">
          <h2 className="font-gilroy text-xl font-bold mb-6">Billing & Subscription</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-dmsans font-semibold mb-4">Current Plan</h3>
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-medium text-lg">{currentPlan} Plan</span>
                    <Badge color="primary" variant="flat" className="ml-2">Current</Badge>
                  </div>
                  <div className="text-xl font-bold">
                    {plans.find(p => p.name === currentPlan)?.price}
                    <span className="text-sm font-normal text-foreground-500 ml-1">
                      /{billingCycle === "monthly" ? "month" : "year"}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-foreground-500 mb-4">
                  {plans.find(p => p.name === currentPlan)?.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm mr-2">Billing cycle:</span>
                    <Select
                      value={billingCycle}
                      onChange={(e) => setBillingCycle(e.target.value)}
                      size="sm"
                      className="w-32"
                    >
                      <SelectItem key="monthly" value="monthly">Monthly</SelectItem>
                      <SelectItem key="yearly" value="yearly">Yearly</SelectItem>
                    </Select>
                  </div>
                  <Button
                    variant="flat"
                    color="primary"
                    size="sm"
                  >
                    Change Plan
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                <div className="border border-foreground-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Documents Processed</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-foreground-500">248 / 500</span>
                    <span className="text-sm text-foreground-500">49.6%</span>
                  </div>
                  <Progress value={49.6} color="primary" className="mb-2" />
                  <p className="text-xs text-foreground-400">Resets on Aug 1, 2023</p>
                </div>
                
                <div className="border border-foreground-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Storage Used</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-foreground-500">2.4 GB / 10 GB</span>
                    <span className="text-sm text-foreground-500">24%</span>
                  </div>
                  <Progress value={24} color="primary" className="mb-2" />
                  <p className="text-xs text-foreground-400">Unlimited storage available on Enterprise plan</p>
                </div>
                
                <div className="border border-foreground-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Team Members</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-foreground-500">4 / 5</span>
                    <span className="text-sm text-foreground-500">80%</span>
                  </div>
                  <Progress value={80} color="primary" className="mb-2" />
                  <p className="text-xs text-foreground-400">Unlimited members available on Enterprise plan</p>
                </div>
              </div>
            </div>
            
            <Divider />
            
            <div>
              <h3 className="font-dmsans font-semibold mb-4">Payment Method</h3>
              <div className="border border-foreground-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-16 bg-foreground-200 rounded mr-4 flex items-center justify-center">
                      <Icon icon="lucide:credit-card" className="h-5 w-5 text-foreground-500" />
                    </div>
                    <div>
                      <p className="font-medium">Visa ending in {paymentMethod.last4}</p>
                      <p className="text-sm text-foreground-500">Expires {paymentMethod.expiry}</p>
                    </div>
                  </div>
                  <Button
                    variant="flat"
                    color="primary"
                    size="sm"
                  >
                    Update
                  </Button>
                </div>
              </div>
              
              <Button
                variant="flat"
                color="primary"
                startContent={<Icon icon="lucide:plus" className="h-4 w-4" />}
              >
                Add Payment Method
              </Button>
            </div>
            
            <Divider />
            
            <div>
              <h3 className="font-dmsans font-semibold mb-4">Billing History</h3>
              <Table 
                aria-label="Billing history table"
                removeWrapper
              >
                <TableHeader>
                  <TableColumn>INVOICE</TableColumn>
                  <TableColumn>DATE</TableColumn>
                  <TableColumn>AMOUNT</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                  <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                  {billingHistory.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.amount}</TableCell>
                      <TableCell>
                        <Badge 
                          color={invoice.status === "Paid" ? "success" : "warning"} 
                          variant="flat"
                        >
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="light"
                          size="sm"
                          startContent={<Icon icon="lucide:download" className="h-4 w-4" />}
                        >
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <Divider />
            
            <div>
              <h3 className="font-dmsans font-semibold mb-4">Billing Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground-700 mb-2">
                    Billing Email
                  </label>
                  <Input
                    defaultValue="billing@acmeconstruction.com"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground-700 mb-2">
                    Billing Contact Name
                  </label>
                  <Input
                    defaultValue="Sarah Johnson"
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <Button
                  color="primary"
                >
                  Save Billing Contact
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-foreground-200 py-4 fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => navigateTo("landing")}
          >
            <Icon 
              icon="lucide:layers" 
              className="text-primary h-7 w-7 mr-2" 
            />
            <span className="font-gilroy font-bold text-xl">Paperstack</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <Button
              variant="light"
              onPress={() => navigateTo("dashboard")}
              startContent={<Icon icon="lucide:arrow-left" className="h-4 w-4" />}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>
      
      {/* Sidebar */}
      {renderSidebar()}
      
      {/* Main Content */}
      <main className="pt-16 md:pl-64">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="font-gilroy text-2xl md:text-3xl font-bold mb-1">Settings</h1>
              <p className="text-foreground-500">Configure your Paperstack experience</p>
            </div>
          </div>
          
          {renderMobileNav()}
          
          {activeTab === "general" && renderGeneralSettings()}
          {activeTab === "team" && renderTeamManagement()}
          {activeTab === "integrations" && renderIntegrations()}
          {activeTab === "templates" && renderDocumentTemplates()}
          {activeTab === "categories" && renderCategoriesAndTaxRules()}
          {activeTab === "notifications" && renderNotifications()}
          {activeTab === "billing" && renderBillingAndSubscription()}
        </div>
      </main>
    </div>
  );
};