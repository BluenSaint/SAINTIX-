"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useDisputeLetters } from "@/hooks/useDisputeLetters"
import { disputeLetters } from "@/lib/database"
import {
  Shield,
  Plus,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Edit,
  Send,
  Loader2,
  Calendar,
  Building,
  MessageSquare,
} from "lucide-react"

function DisputesPage() {
  const { user } = useAuth()
  const { disputeLetters: disputes, loading, fetchDisputes } = useDisputeLetters()
  const [selectedDispute, setSelectedDispute] = useState(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [newDispute, setNewDispute] = useState({
    creditBureau: '',
    type: '',
    content: '',
  })

  useEffect(() => {
    if (user) {
      fetchDisputes()
    }
  }, [user, fetchDisputes])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200'
      case 'pending':
        return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'sent':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'draft':
        return 'bg-slate-100 text-slate-600 border-slate-200'
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />
      case 'pending':
        return <Clock className="w-4 h-4" />
      case 'sent':
        return <Send className="w-4 h-4" />
      case 'draft':
        return <Edit className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleCreateDispute = async () => {
    if (!user || !newDispute.creditBureau || !newDispute.type || !newDispute.content) {
      return
    }

    setIsCreating(true)
    try {
      await disputeLetters.createDispute(
        user.id,
        newDispute.creditBureau,
        newDispute.type,
        newDispute.content
      )
      
      setNewDispute({ creditBureau: '', type: '', content: '' })
      setIsCreateDialogOpen(false)
      fetchDisputes() // Refresh the list
    } catch (error) {
      console.error('Error creating dispute:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const handleUpdateStatus = async (disputeId: string, newStatus: string) => {
    try {
      await disputeLetters.updateStatus(disputeId, newStatus)
      fetchDisputes() // Refresh the list
    } catch (error) {
      console.error('Error updating dispute status:', error)
    }
  }

  const disputeTypes = [
    'Inaccurate Account Information',
    'Identity Theft',
    'Incorrect Payment History',
    'Duplicate Account',
    'Account Not Mine',
    'Incorrect Balance',
    'Outdated Information',
    'Other'
  ]

  const creditBureaus = ['Experian', 'Equifax', 'TransUnion']

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50/30 to-yellow-50/20">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-orange-600" />
          <p className="text-slate-600">Loading your disputes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/30 to-yellow-50/20">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Dispute Management</h1>
              <p className="text-slate-600">Track and manage your credit disputes</p>
            </div>
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Create Dispute
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Dispute Letter</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="creditBureau">Credit Bureau</Label>
                    <Select value={newDispute.creditBureau} onValueChange={(value) => 
                      setNewDispute(prev => ({ ...prev, creditBureau: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bureau" />
                      </SelectTrigger>
                      <SelectContent>
                        {creditBureaus.map((bureau) => (
                          <SelectItem key={bureau} value={bureau}>
                            {bureau}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Dispute Type</Label>
                    <Select value={newDispute.type} onValueChange={(value) => 
                      setNewDispute(prev => ({ ...prev, type: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {disputeTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Dispute Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Describe the issue and why you're disputing this item..."
                    value={newDispute.content}
                    onChange={(e) => setNewDispute(prev => ({ ...prev, content: e.target.value }))}
                    rows={6}
                    className="resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCreateDispute}
                    disabled={isCreating || !newDispute.creditBureau || !newDispute.type || !newDispute.content}
                    className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                  >
                    {isCreating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'Create Dispute'
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200/50 shadow-sm rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700 font-medium">Total Disputes</p>
                  <p className="text-2xl font-bold text-blue-800">{disputes.length}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200/50 shadow-sm rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-700 font-medium">Pending</p>
                  <p className="text-2xl font-bold text-orange-800">
                    {disputes.filter(d => d.status === 'pending').length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200/50 shadow-sm rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-700 font-medium">Sent</p>
                  <p className="text-2xl font-bold text-purple-800">
                    {disputes.filter(d => d.status === 'sent').length}
                  </p>
                </div>
                <Send className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200/50 shadow-sm rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-emerald-700 font-medium">Resolved</p>
                  <p className="text-2xl font-bold text-emerald-800">
                    {disputes.filter(d => d.status === 'resolved').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Disputes List */}
        <Card className="bg-white/80 backdrop-blur-sm border border-gray-100/50 shadow-xl rounded-3xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl">
                <Shield className="w-5 h-5 text-amber-600" />
              </div>
              Your Dispute Letters
            </CardTitle>
          </CardHeader>
          <CardContent>
            {disputes.length === 0 ? (
              <div className="text-center py-12">
                <Shield className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No disputes yet</h3>
                <p className="text-slate-600 mb-6">Create your first dispute letter to get started</p>
                <Button 
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Dispute
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {disputes.map((dispute) => (
                  <div key={dispute.id} className="border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-slate-100 rounded-xl">
                          <Building className="w-6 h-6 text-slate-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 text-lg">
                            {dispute.credit_bureau} - {dispute.type}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-slate-600 mt-1">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Created: {formatDate(dispute.created_at)}
                            </div>
                            {dispute.generated_by === 'ai' && (
                              <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                                AI Generated
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Badge className={`${getStatusColor(dispute.status)} flex items-center gap-1`}>
                          {getStatusIcon(dispute.status)}
                          {dispute.status}
                        </Badge>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedDispute(dispute)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-slate-600" />
                        <span className="text-sm font-medium text-slate-700">Dispute Content</span>
                      </div>
                      <p className="text-sm text-slate-600 line-clamp-3">
                        {dispute.content}
                      </p>
                    </div>

                    {dispute.status === 'draft' && (
                      <div className="flex justify-end mt-4">
                        <Button
                          size="sm"
                          onClick={() => handleUpdateStatus(dispute.id, 'sent')}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                        >
                          <Send className="w-4 h-4 mr-1" />
                          Send Dispute
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Dispute Detail Modal */}
        {selectedDispute && (
          <Dialog open={!!selectedDispute} onOpenChange={() => setSelectedDispute(null)}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Building className="w-6 h-6 text-slate-600" />
                  {selectedDispute.credit_bureau} - {selectedDispute.type}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <p className="text-sm text-slate-600">Status</p>
                    <Badge className={`${getStatusColor(selectedDispute.status)} flex items-center gap-1 mt-1`}>
                      {getStatusIcon(selectedDispute.status)}
                      {selectedDispute.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Created</p>
                    <p className="font-medium text-slate-900">{formatDate(selectedDispute.created_at)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Generated By</p>
                    <p className="font-medium text-slate-900 capitalize">{selectedDispute.generated_by}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Dispute Content</h3>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-slate-700 whitespace-pre-wrap">{selectedDispute.content}</p>
                  </div>
                </div>

                {selectedDispute.status === 'draft' && (
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setSelectedDispute(null)}>
                      Close
                    </Button>
                    <Button
                      onClick={() => {
                        handleUpdateStatus(selectedDispute.id, 'sent')
                        setSelectedDispute(null)
                      }}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    >
                      <Send className="w-4 h-4 mr-1" />
                      Send Dispute
                    </Button>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}

export default function DisputesPageWrapper() {
  return (
    <ProtectedRoute requiredRole="client">
      <DisputesPage />
    </ProtectedRoute>
  )
}
